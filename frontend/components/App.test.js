import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import AppClass from './AppClass'; 

describe('App', () => {
  test('renders coordinates heading', () => {
    render(<AppClass />);
    const coordinatesHeading = screen.getByText(/Coordinates/i);
    expect(coordinatesHeading).toBeInTheDocument();
  });
})

//  test('renders steps heading', () => {
//    render(<AppClass />);
//    const stepsHeading = screen.getByText(/You moved/i);
//    expect(stepsHeading).toBeInTheDocument();
//  });

//  test('renders move buttons', () => {
//    render(<AppClass />);
//    const moveButtons = screen.getAllByRole('button', { name: /LEFT|UP|RIGHT|DOWN/i });
//    expect(moveButtons.length).toBe(4);
//  });

//  test('renders reset button', () => {
//    render(<AppClass />);
//    const resetButton = screen.getByRole('button', { name: /reset/i });
//    expect(resetButton).toBeInTheDocument();
//  });

//  test('typing on the input changes its value', () => {
//    render(<AppClass />);
//    const emailInput = screen.getByPlaceholderText('type email');
//    const testEmail = 'test@example.com';
//    fireEvent.change(emailInput, { target: { value: testEmail } });
//    expect(emailInput.value).toBe(testEmail)
//  });
//})
