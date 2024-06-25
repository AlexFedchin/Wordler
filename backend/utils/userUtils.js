// Helper function to assign a new user unique ID
const generateUniqueId = (users) => {
  const generateId = () => Math.floor(100000 + Math.random() * 900000);
  let newId = generateId();
  while (users.some((user) => user.id === newId)) {
    newId = generateId();
  }
  return newId;
};

module.exports = { generateUniqueId };
