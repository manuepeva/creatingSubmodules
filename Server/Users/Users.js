const users = [];

const addUsers = ({ id, name, room }) => {
  // Si el nombre es JavaScript mastery cambiarlo a lowercase letters
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );
  if (existingUser) {
    return { error: "That Username has already be taken" };
  }

  const user = { id, name, room };

  users.push(user);

  return { user };
};

const removeUsers = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUsers = (id) => {
  return users.find((user) => user.id === id);
};

const getSpecificUsers = (room) => {
  return users.filter((user) => user.room === room);
};

module.exports = { addUsers, removeUsers, getUsers, getSpecificUsers };
