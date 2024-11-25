const admin = require('firebase-admin');

// Menginisialisasi koneksi dengan Firestore
const firestore = admin.firestore();

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

    // Membuat akun pengguna melalui Firebase Authentication
    const newUser = await admin.auth().createUser({
        email,
        password,
        displayName: name,
    });

    const userData = { name, email, userId: newUser.uid };
    await firestore.collection('users').doc(newUser.uid).set(userData);

    res.status(201).json({ success: true, message: 'User Registered Successfully', userId: newUser.uid });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const login = async (req, res) => {
    try{
        const { email } = req.body;

        const user = await admin.auth().getUserByEmail(email);

        const customToken = await admin.auth().createCustomToken(user.uid);

        const userDoc = await firestore.collection('users').doc(user.uid).get();
        if (!userDoc.exists) {
            throw new Error('User data not found in Firestore');
        }

        const userData = userDoc.data();
        res.status(200).json({
            success: true,
            message: 'Login Successful',
            data: { userId: user.uid, name: userData.name, token: customToken },
        });
    }   catch (err) {
        res.status(401).json({ success: false, error: err.message });
    }
};

const updateUserDetails = async (req, res) => {
    try {
        const { uid } = req.params;
        const { name, email } = req.body;

        await admin.auth().updateUser(uid, { email, displayName: name });

        await firestore.collection('users').doc(uid).update({ name, email });

        res.status(200).json({ success: true, message: 'User Data Updated Successfully' });     
    }   catch (err) {
        res.status(400).json({ success: false, error: err.message});
    }
};

const getUser = async (req, res) => {
    try {
        const { uid } = req.params;

        const userSnapshot = await firestore.collection('users').doc(uid).get();
        if (!userSnapshot.exists) {
            throw new Error('User not found');
        }

        const userData = userSnapshot.data();
        res.status(200).json({ success: true, user: userData });
    }   catch (err) {
        res.status(404).json({ success: false, error: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { uid } = req.params;

        await admin.auth().deleteUser(uid);

        await firestore.collection('users').doc(uid).delete();

        res.status(200).json({ success: true, message: 'User Deleted Successfully '});
    }   catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

const logout = async (req, res) => {
    try {
        res.status(200).json({ success: true, message: 'Logout Successful' });
    }   catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

module.exports = {
    register,
    login,
    updateUserDetails,
    getUser,
    deleteUser,
    logout,
};