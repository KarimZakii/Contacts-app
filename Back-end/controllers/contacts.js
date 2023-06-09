import Contact from "../models/Contact.js";
import User from "../models/User.js";

/* CREATE */
export const createContact = async (req, res) => {
  try {
    const { name, phone, address, notes, userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(409)
        .json({ message: "Something wrong with the request" });
    }
    const newContact = new Contact({
      name,
      phone,
      address,
      notes,
      userId,
    });
    await newContact.save();

    res.status(200).json(newContact);
  } catch (error) {
    res.json({ message: error.message });
  }
};

/* READ */
export const getContacts = async (req, res) => {
  try {
    const offset = req.query.offset;

    const filter = req.query;
    Object.keys(filter).forEach((key) => {
      filter[key] = { $regex: new RegExp(filter[key], "i") };
    });
    delete filter.offset;

    const contacts = await Contact.find(filter).limit(5).skip(offset);
    const count = await Contact.countDocuments(filter);

    res.status(200).json({ contacts, count });
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
};

/* UPDATE */
export const editContact = async (req, res) => {
  try {
    const { _id, name, phone, address, notes } = req.body;

    const contact = await Contact.findByIdAndUpdate(_id, {
      name,
      phone,
      address,
      notes,
    });
    console.log(req.body);
    res.status(200).json(contact);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { _id } = req.body;

    const contact = await Contact.findByIdAndDelete(_id);

    res.status(200).json(contact);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
