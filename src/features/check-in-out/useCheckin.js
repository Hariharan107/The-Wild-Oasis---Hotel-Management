import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const useCheckin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: checkin,
    isLoading: isCheckingIn,
    error: checkinError,
  } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: 'checked-in',
        isPaid: true,
      }),
    onSuccess: (data) => {
      console.log(data);
      toast.success(`Booking ${data.id} checked in successfully`);
      queryClient.invalidateQueries({ active: true });
      navigate('/');
    },
    onError: () => toast('Error checking in booking'),
  });
  return { checkin, isCheckingIn, checkinError };
};
