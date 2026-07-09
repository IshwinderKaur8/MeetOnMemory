import Decision from "../models/decisionModel.js";
import ActionItem from "../models/actionItemModel.js";
import { getDecisionLineage } from "../services/knowledgeGraphService.js";

export const getDecisionLineageController = async (req, res) => {
  try {
    const { id } = req.params;
    const chain = await getDecisionLineage(id);
    res.status(200).json({ success: true, lineage: chain });
  } catch (error) {
    console.error("getDecisionLineage error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch decision lineage" });
  }
};

export const getOpenActionItems = async (req, res) => {
  try {
    const { status = "open", organization } = req.query;
    const filter = {};
    if (status !== "all") filter.status = status;
    if (organization) filter.organization = organization;

    const items = await ActionItem.find(filter)
      .populate("sourceMeetingId", "title date")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, actionItems: items });
  } catch (error) {
    console.error("getOpenActionItems error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch action items" });
  }
};

export const updateActionItemStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const allowed = ["open", "in-progress", "resolved", "superseded"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const update = { status };
    if (status === "resolved") update.resolvedAt = new Date();

    const item = await ActionItem.findByIdAndUpdate(id, update, { new: true });
    if (!item) return res.status(404).json({ success: false, message: "Action item not found" });

    res.status(200).json({ success: true, actionItem: item });
  } catch (error) {
    console.error("updateActionItemStatus error:", error);
    res.status(500).json({ success: false, message: "Failed to update action item" });
  }
};