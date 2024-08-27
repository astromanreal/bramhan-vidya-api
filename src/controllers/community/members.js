const Community = require("../../models/community/communityModel");
const CommunityUser = require("../../models/community/membersModel");

exports.createMember = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    if (!community) {
      return res.status(404).send({ message: "Community not found" });
    }
    const member = new CommunityUser({
      communityId: community._id,
      userId: req.body.userId,
      role: req.body.role,
    });
    await member.save();
    res.status(201).send(member);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all community members
exports.getMembers = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    if (!community) {
      return res.status(404).send({ message: "Community not found" });
    }
    const members = await CommunityUser.find({ communityId: community._id });
    res.send(members);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Update a community member
exports.updateMember = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    if (!community) {
      return res.status(404).send({ message: "Community not found" });
    }
    const member = await CommunityUser.findOne({
      communityId: community._id,
      userId: req.params.memberId,
    });
    if (!member) {
      return res.status(404).send({ message: "Member not found" });
    }
    member.role = req.body.role;
    await member.save();
    res.send(member);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a community member
exports.deleteMember = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    if (!community) {
      return res.status(404).send({ message: "Community not found" });
    }
    const member = await CommunityUser.findOneAndDelete({
      communityId: community._id,
      userId: req.params.memberId,
    });
    if (!member) {
      return res.status(404).send({ message: "Member not found" });
    }
    res.send({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
};
