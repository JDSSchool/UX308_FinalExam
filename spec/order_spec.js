import { handleInput, clearInput } from '../src/Order.js';

describe("Tests all stages of a salon order", function () {
    beforeEach(function () {
        clearInput();
    });
    it("test welcoming", function () {
        const aResults = handleInput("hello");
        expect(aResults[0]).toBe("Welcome to Glamour Salon!");
    });
    it("test buzz cut", function () {
        handleInput("hello");
        const aResults = handleInput("buzz cut");
        expect(aResults[0]).toBe("Great choice! You've selected a buzz cut.");
    });
    it("test upselling yes", function () {
        handleInput("hello");
        handleInput("buzz cut");
        const aResults = handleInput("yes");
        expect(aResults[0]).toBe("Perfect! Added the product to your order.");
    });
    it("test confirming yes", function () {
        handleInput("hello");
        handleInput("buzz cut");
        handleInput("yes");
        const aResults = handleInput("yes");
        expect(aResults[0]).toBe("Appointment confirmed!");
    });
});