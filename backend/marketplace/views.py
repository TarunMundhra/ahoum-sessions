from rest_framework import viewsets, permissions
from .models import Session, Booking
from .serializers import SessionSerializer, BookingSerializer

class SessionViewSet(viewsets.ModelViewSet):
    """
    Anyone can view sessions, but you must be logged in to create one.
    """
    queryset = Session.objects.all().order_by('-start_time')
    serializer_class = SessionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        # Automatically assign the logged-in user as the creator
        serializer.save(creator=self.request.user)


class BookingViewSet(viewsets.ModelViewSet):
    """
    You must be logged in to view or create bookings.
    Users only see their own bookings.
    """
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Security: Only return bookings belonging to the user making the request
        return Booking.objects.filter(user=self.request.user).order_by('-booked_at')

    def perform_create(self, serializer):
        # Automatically assign the logged-in user to the booking
        serializer.save(user=self.request.user)