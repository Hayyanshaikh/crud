const User = require('../models/user');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const limit = req.query.limit;
      const users = await User.find().limit(limit);
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },


  createUser: async (req, res) => {
    const { name, email, age } = req.body;
    const newUser = new User({ name, email, age });

    try {
      const savedUser = await newUser.save();
      res.json(savedUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteUser: async (req, res) => {
    const userId = req.params.userId;
    try {
      const deletedUser  = await User.findByIdAndDelete(userId);
      if (!deletedUser ) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully', deletedUser  });
    } catch (err) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  
  updateUser: async (req, res) => {
  const userId = req.params.userId;
  const { name, email, age } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, age },
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


};

module.exports = userController;