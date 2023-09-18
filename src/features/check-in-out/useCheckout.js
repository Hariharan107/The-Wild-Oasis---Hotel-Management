import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import { toast } from 'react-hot-toast';

export const useCheckout = () => {
  const queryClient = useQueryClient();
  const {
    mutate: checkout,
    isLoading: isCheckingOut,
    error: checkoutError,
  } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: 'checked-out',
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} checked out successfully`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast('Error checking out booking'),
  });
  return { checkout, isCheckingOut, checkoutError };
};
