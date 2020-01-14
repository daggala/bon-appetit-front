import '@testing-library/jest-dom/extend-expect';
import Login from './login.js';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import axiosMock from 'axios';

test('shows error message', async () => {
    const login = () => null;

    const { container, getByText } = render(<Login login={login}/>)

    expect(getByText('Not a valid username or password')).toBeInTheDocument()
    
  })
  