from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.db import connection

# Clase temporal para engañar a SimpleJWT y que genere el token 
# con el ID de tu tabla System_User en lugar de la tabla de Django
class DummyUser:
    def __init__(self, user_id):
        self.id = user_id

@api_view(['POST'])
def login_endpoint(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Por favor, envíe username y password.'}, status=400)

    try:
        with connection.cursor() as cursor:
            # Llamamos al SP: p_user, p_pass, p_id(OUT), p_role(OUT), p_ok(OUT)
            result = cursor.callproc('PKG_SYSTEM_SECURITY.login_user', [
                username, 
                password, 
                0,    # out_id
                '',   # out_role
                0     # out_ok
            ])

            # Recuperamos las variables OUT
            user_id = result[2]
            user_role = result[3]
            is_ok = result[4]

        # Si Oracle validó correctamente las credenciales (p_ok = 1)
        if is_ok == 1:
            # Generamos el Token JWT manualmente
            refresh = RefreshToken.for_user(DummyUser(user_id))
            # Añadimos datos extra al token para que React los pueda leer
            refresh['username'] = username
            refresh['role'] = user_role

            return Response({
                'status': 'success',
                'message': 'Login exitoso',
                'user': {
                    'id': user_id,
                    'username': username,
                    'role': user_role
                },
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            }, status=200)
            
        else:
            return Response({'error': 'Credenciales incorrectas'}, status=401)

    except Exception as e:
        return Response({'error': f'Error en el servidor: {str(e)}'}, status=500)