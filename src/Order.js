let currentState = welcoming;

export function handleInput(sInput) {
  return currentState(sInput);
}

export function clearInput(){
  currentState = welcoming;  
}

function welcoming(sInput) {
  let aReturn = [];
  const input = sInput?.toLowerCase().trim();
  if (input && (input.includes('buzz cut') || input.includes('regular cut') || input.includes('1 blade'))) {
    return ordering(sInput);
  }
  currentState = ordering;
  aReturn.push("Welcome to Glamour Salon!");
  aReturn.push("What service would you like today? We offer haircuts and styling.");
  return aReturn;
}

function ordering(sInput) {
  let aReturn = [];
  const input = sInput.toLowerCase();
  let serviceName = '';
  if (input.includes('buzz cut')) {
    serviceName = 'buzz cut';
  } else if (input.includes('regular cut')) {
    serviceName = 'regular cut';
  } else if (input.includes('1 blade')) {
    serviceName = '1 blade';
  }
  
  if (serviceName) {
    currentState = upselling;
    aReturn.push(`Great choice! You've selected a ${serviceName}.`);
    aReturn.push("Would you like some shampoo to take home with you?");
  } else {
    aReturn.push("I'm sorry, I didn't understand that. Please choose from buzz cut, regular cut, or 1 blade.");
    currentState = ordering;
  }
  return aReturn;
}

function upselling(sInput) {
  let aReturn = [];
  currentState = confirming;
  if (sInput.toLowerCase().startsWith('y')) {
    aReturn.push("Perfect! Added the product to your order.");
    aReturn.push("Your total is $45. Would you like to confirm this appointment?");
  } else {
    aReturn.push("No problem, just the service then.");
    aReturn.push("Your total is $35. Would you like to confirm this appointment?");
  }
  return aReturn;
}

function confirming(sInput) {
  let aReturn = [];
  currentState = welcoming;
  if (sInput.toLowerCase().startsWith('y')) {
    aReturn.push("Appointment confirmed!");
    aReturn.push("Please arrive 10 minutes early. See you soon!");
  } else {
    aReturn.push("No worries, feel free to book another time.");
  }
  return aReturn;
}