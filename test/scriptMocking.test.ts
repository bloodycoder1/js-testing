// What is Mocking?
// Mocking means replacing a real dependency with a controlled fake implementation during testing
import { describe, it, expect, vi } from 'vitest';

describe('Mock Function Testing', () => {

    it('should call the email function', () => {

        // Arrange
        const sendEmail = vi.fn();

        // Act
        sendEmail('alex@gmail.com');

        // Assert
        expect(sendEmail).toHaveBeenCalled();

    });

});

// expect(sendEmail).toHaveBeenCalled();
// expect(sendEmail).toHaveBeenCalledTimes(1);
// expect(sendEmail).toHaveBeenCalledWith('alex@gmail.com');