from django.http import JsonResponse
from django.views.decorators.http import require_GET


@require_GET
def health_check(request):
    """
    Lightweight health check endpoint for Render monitoring and uptime checks.
    Does not perform database queries to keep response time under 10ms.
    """
    return JsonResponse({
        "status": "ok",
        "service": "bookhaven-api"
    })
