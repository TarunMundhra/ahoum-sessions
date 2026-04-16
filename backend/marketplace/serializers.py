from rest_framework import serializers
from .models import Session, Booking

class SessionSerializer(serializers.ModelSerializer):
    # We add this so React gets the actual username, not just an ID number
    creator_username = serializers.ReadOnlyField(source='creator.username')

    class Meta:
        model = Session
        fields = [
            'id', 'creator', 'creator_username', 'title', 
            'description', 'price', 'start_time', 'end_time', 'is_active'
        ]
        # We make 'creator' read-only so users can't forge sessions under someone else's name
        read_only_fields = ['creator']


class BookingSerializer(serializers.ModelSerializer):
    session_title = serializers.ReadOnlyField(source='session.title')
    user_username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Booking
        fields = ['id', 'user', 'user_username', 'session', 'session_title', 'booked_at']
        read_only_fields = ['user']