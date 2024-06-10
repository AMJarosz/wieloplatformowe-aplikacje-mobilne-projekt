import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CalendarScreen from './components/Calendar';
import AddScreen from './components/AddScreen';
import { Alert } from 'react-native';

jest.mock('expo-file-system', () => ({
  documentDirectory: 'documentDirectory',
  getInfoAsync: jest.fn(),
  readAsStringAsync: jest.fn(),
  writeAsStringAsync: jest.fn(),
}));

jest.mock('@expo/vector-icons', () => ({
    Feather: 'Feather',
  }));
  

  describe('CalendarScreen component', () => {
    it('renders correctly', () => {
      const mockRoute = {
        params: {},
      };
      const { getByTestId } = render(<CalendarScreen route={mockRoute} />);
      const calendarScreen = getByTestId('calendar');
      expect(calendarScreen).toBeTruthy();
    });
      
  it('displays a message when there are no tasks for the currently selected day', async () => {
    // Dane testowe - brak zadań na aktualnie wybrany dzień
    const mockTasks = [];
    const mockRoute = {
      params: {},
    };
    
    // Renderowanie komponentu
    const { getByText } = render(<CalendarScreen route={mockRoute} />);
    
    // Sprawdzenie czy wyświetla się komunikat o braku zadań
    await waitFor(() => {
      expect(getByText('No upcoming tasks from 2024-06-10')).toBeTruthy();
    });
  });


  it('navigates to AddTask screen when add button is pressed', async () => {
    // Symulacja propsów
    const mockRoute = {
      params: {},
    };
    const mockNavigation = {
      navigate: jest.fn(),
    };
    
    // Renderowanie komponentu
    const { getByTestId } = render(<CalendarScreen route={mockRoute} navigation={mockNavigation} />);
    
    // Symulacja naciśnięcia przycisku dodawania nowego zadania
    fireEvent.press(getByTestId('add-button'));
    
    // Sprawdzenie czy funkcja nawigacji została wywołana z odpowiednim argumentem
    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Add', { selectedDate: '2024-06-10' });
    });
  });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
describe('AddScreen component', () => {
    it('renders correctly', () => {
        const mockRoute = {
          params: {},
        };
        const mockNavigation = {
          navigate: jest.fn(),
        };
        const { getByPlaceholderText, getByText } = render(
          <AddScreen route={mockRoute} navigation={mockNavigation} />
        );
    
        // Check if input placeholders are rendered
        const taskNameInput = getByPlaceholderText('Task name');
        expect(taskNameInput).toBeTruthy();
    
        // Check if save and back buttons are rendered
        const saveButton = getByText('Save');
        expect(saveButton).toBeTruthy();
        const backButton = getByText('Back');
        expect(backButton).toBeTruthy();
      });
    });

     it('displays alert if any input is empty on save', () => {
    const mockRoute = {
      params: {},
    };
    const { getByText } = render(<AddScreen route={mockRoute} />);
    const saveButton = getByText('Save');
    fireEvent.press(saveButton);
    jest.spyOn(Alert, 'alert');
    expect(Alert.alert).toBeTruthy();
  });

  it('navigates back to CalendarScreen after editing a task', () => {
    const mockTask = {
      name: 'Existing Task',
      date: '2024-06-10',
      hour: '10:00',
    };
    const mockRoute = {
      params: { task: mockTask },
    };
    const navigationMock = { navigate: jest.fn() };
    const { getByText } = render(<AddScreen route={mockRoute} navigation={navigationMock} />);
    const saveButton = getByText('Save');
    fireEvent.press(saveButton);
    expect(navigationMock.navigate).toHaveBeenCalledWith('Calendar', {
      editedTask: {
        ...mockTask,
        date: expect.any(String),
        hour: expect.any(String),
      },
    });
  });
});