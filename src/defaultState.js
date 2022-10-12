// To load default state, enter `localStorage.clear()` in the terminal of the browser and refresh
export const defaultUsers = {
  bob: {
    username: 'bob',
    password: 'bob',
    amountDue: 3000,
    discount: true,
    eventsAttended: 1000,
    timesPaid: 100,
    paymentsMissed: 4,
    lastMissedPayment: new Date(),
    role: 'member', // member, coach, treasurer
    mailbox: ['message1', 'message2'],
    phone: '64710235 6',
    address: '100 east street',
  },
  alice: {
    username: 'alice',
    password: 'alice',
    amountDue: 3000,
    discount: true,
    eventsAttended: 10,
    timesPaid: 100000000,
    paymentsMissed: 4,
    lastMissedPayment: new Date(),
    role: 'member',
    mailbox: [],
    phone: '4643234',
    address: '454 second street',
  },
  charlie: {
    username: 'charlie',
    password: 'charlie',
    amountDue: 0,
    discount: false,
    timesPaid: 0,
    paymentsMissed: 0,
    lastMissedPayment: new Date(),
    role: 'coach',
    mailbox: [],
    phone: '4165551234',
    address: '42 coast avenue',
  },
  trudeau: {
    username: 'trudeau',
    password: 'trudeau',
    amountDue: 5000,
    discount: false,
    timesPaid: 0,
    paymentsMissed: 10,
    lastMissedPayment: new Date(),
    role: 'treasurer',
    mailbox: [],
    phone: '4041011337',
    address: '201 territory street',
  },
};

export const defaultEvents = [
  {
    id: '0',
    name: 'event1',
    coach: 'charlie',
    members: ['bob', 'alice'],
    date: new Date(),
    price: 10,
  },
];

export const defaultRevenue = [
  {
    name: 'booking',
    amount: 300,
    date: new Date('July 21, 21 00:20:10'),
  },
];

export const defaultExpenses = [
  {
    name: 'rent',
    paid: false,
    amount: 300,
    date: new Date(),
  },
];
