import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [
    {
      id: 1,
      contactOwner: "John Doe",
      accountName: "Acme Corp",
      name: "Alice Johnson",
      email: "alice.johnson@acme.com",
      phone: "+1-555-123-4567",
      createdDate: "2025-08-01",
      contactLog: "Spoke about product demo",
      contactSource: "Website Form",
      contactStatus: "New",
    },
    {
      id: 2,
      contactOwner: "Jane Smith",
      accountName: "Beta Ltd",
      name: "Bob Williams",
      email: "bob.williams@beta.com",
      phone: "+1-555-987-6543",
      createdDate: "2025-07-28",
      contactLog: "Sent pricing details",
      contactSource: "LinkedIn",
      contactStatus: "Follow Up",
    },
    {
      id: 3,
      contactOwner: "Emily Brown",
      accountName: "Gamma Inc",
      name: "Charlie Davis",
      email: "charlie.davis@gamma.com",
      phone: "+1-555-222-3333",
      createdDate: "2025-07-25",
      contactLog: "Scheduled a follow-up call",
      contactSource: "Referral",
      contactStatus: "Contacted",
    },
    {
      id: 4,
      contactOwner: "Michael Clark",
      accountName: "Delta Co",
      name: "Diana Evans",
      email: "diana.evans@delta.com",
      phone: "+1-555-444-5555",
      createdDate: "2025-07-20",
      contactLog: "Interested in enterprise",
      contactSource: "Email Campaign",
      contactStatus: "Interested",
    },
    {
      id: 5,
      contactOwner: "Sarah Miller",
      accountName: "Omega LLC",
      name: "Ethan Harris",
      email: "ethan.harris@omega.com",
      phone: "+1-555-666-7777",
      createdDate: "2025-07-18",
      contactLog: "Left voicemail",
      contactSource: "Cold Call",
      contactStatus: "No Response",
    },
    ...Array.from({ length: 45 }, (_, index) => ({
    id: index + 6,
    contactOwner: `Owner ${index + 6}`,
    accountName: `Account ${index + 6}`,
    name: `Contact Name ${index + 6}`,
    email: `contact${index + 6}@example.com`,
    phone: `+1-555-${1000 + index}`,
    createdDate: `2025-07-${(index % 30) + 1}`.padStart(10, '0'),
    contactLog: index % 2 === 0 ? "Followed up on proposal" : "Sent introductory email",
    contactSource: ["LinkedIn", "Website Form", "Referral", "Cold Call", "Email Campaign"][index % 5],
    contactStatus: ["New", "Follow Up", "Contacted", "Interested", "No Response"][index % 5],
  }))
  ],
};

const detailSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
  },
});

export const {  addContact } = detailSlice.actions;
export default detailSlice.reducer;
