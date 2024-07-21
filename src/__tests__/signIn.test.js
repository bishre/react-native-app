import { SignInContainer } from "../components/Signin";
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();
      render(<SignInContainer onSubmit={onSubmit}/>);
      fireEvent.changeText(screen.getByPlaceholderText('username'), 'kalle');
      fireEvent.changeText(screen.getByPlaceholderText('password'), 'password');
      fireEvent.press(screen.getByText('Sign-in'));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);

        // onSubmit.mock.calls[0][0] contains the first argument of the first call
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        });

      })
    })
  })
})