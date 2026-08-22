from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

from .models import User
from .serializers import (
    UserRegistrationSerializer,
    UserLoginSerializer,
    UserProfileSerializer,
    UserUpdateSerializer,
)


def get_tokens_for_user(user):
    """Generate JWT access + refresh tokens for a user."""
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class RegisterView(APIView):
    """POST /api/auth/register/ — Create new user account."""
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            tokens = get_tokens_for_user(user)
            profile = UserProfileSerializer(user).data
            return Response({
                'message': f'Welcome to BookHaven, {user.get_display_name()}! 🎉',
                'user': profile,
                **tokens,
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from django.contrib.auth import login as django_login

class LoginView(APIView):
    """POST /api/auth/login/ — Authenticate and return JWT tokens."""
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            django_login(request, user)
            tokens = get_tokens_for_user(user)
            profile = UserProfileSerializer(user).data
            return Response({
                'message': f'Welcome back, {user.get_display_name()}! 👋',
                'user': profile,
                **tokens,
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from django.contrib.auth import logout as django_logout

class LogoutView(APIView):
    """POST /api/auth/logout/ — Blacklist refresh token and clear session."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        django_logout(request)
        try:
            refresh_token = request.data.get('refresh')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
            return Response({'message': 'Logged out successfully! 👋'})
        except TokenError:
            return Response({'message': 'Logged out.'})


class ProfileView(APIView):
    """GET/PUT /api/auth/me/ — Get or update current user profile."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        serializer = UserUpdateSerializer(
            request.user, data=request.data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(UserProfileSerializer(request.user).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GoogleAuthView(APIView):
    """POST /api/auth/google/ — Simulate Google OAuth (placeholder)."""
    permission_classes = [AllowAny]

    def post(self, request):
        # In production, verify Google ID token here.
        # For now, create/get a demo user.
        email = request.data.get('email', 'google.user@gmail.com')
        name = request.data.get('name', 'Google User')

        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                'username': email.split('@')[0],
                'name': name,
            }
        )
        if created:
            user.set_unusable_password()
            user.save()

        tokens = get_tokens_for_user(user)
        profile = UserProfileSerializer(user).data
        return Response({
            'message': f'Welcome, {user.get_display_name()}! 🎉',
            'user': profile,
            **tokens,
        })
