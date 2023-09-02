import '@testing-library/jest-dom/extend-expect';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';

import { Home } from '../pages';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Home', () => {
  it('HOME 렌더링 테스트', () => {
    render(<Home />);

    const gameTitle = screen.getByText('누가 더쎔?');
    expect(gameTitle).toBeInTheDocument();

    const startButton = screen.getByText('게임시작');
    expect(startButton).toBeInTheDocument();
  });

  it('게임 시작 버튼 클릭 테스트', () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockImplementation(() => navigate);

    render(<Home />);
    const startButton = screen.getByText('게임시작');
    userEvent.click(startButton);

    expect(navigate).toHaveBeenCalledWith('/ready');
  });
});
