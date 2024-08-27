const Community = require("../../models/community/communityModel");
const Member = require("../../models/community/membersModel");

exports.createCommunity = async (req, res) => {
  try {
    const community = new Community(req.body);
    await community.save();
    const communityUser = new Member({
      communityId: community._id,
      userId: req.body.userId,
      role: "admin",
    });
    await communityUser.save();

    res.status(201).send(community);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getAllCommunities = async (req, res) => {
  try {
    const communities = await Community.find();
    res.status(200).send(communities);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getCommunityById = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    if (!community) {
      return res.status(404).send({ message: "Community not found" });
    }
    res.status(200).send(community);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateCommunity = async (req, res) => {
  try {
    const community = await Community.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!community) {
      return res.status(404).send({ message: "Community not found" });
    }
    res.status(200).send(community);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteCommunity = async (req, res) => {
  try {
    await Community.findByIdAndDelete(req.params.id);
    res.status(204).send({ message: "Community deleted" });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.joinCommunity = async (req, res) => {
  try {
    const communityId = req.params.id;
    const userId = req.body.userId;
    // Check if user is already a member of the community
    const existingMember = await Member.findOne({ userId, communityId });
    if (existingMember) {
      return res.status(200).send({
        success: false,
        message: "You are already a member of this community",
      });
    }

    // Create a new member document
    const newMember = new Member({ userId, communityId, role: "member" });
    await newMember.save();

    res.status(200).send({ message: "Joined community successfully!" });
  } catch (err) {
    console.error(err);
    res.status(400).send({ message: "Failed to join community" });
  }
};

exports.myCommunities = async (req, res) => {
  try {
    const { userId } = req.query;
    const memberCommunities = await Member.find({ userId });
    const communityIds = memberCommunities.map((member) => member.communityId);
    const communities = await Community.find({ _id: { $in: communityIds } });
    res.status(200).send(communities);
  } catch (err) {
    console.error(err);
    res.status(400).send({ message: "Failed to fetch communities" });
  }
};

exports.checkMembership = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;
    const member = await Member.findOne({
      communityId: id,
      userId: userId,
    });
    res.status(200).send({ isMember: !!member });
  } catch (err) {
    console.error(err);
    res.status(400).send({ message: "Failed to check membership" });
  }
};
