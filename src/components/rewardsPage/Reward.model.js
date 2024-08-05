export default class RewardModel {
    constructor(rewardName, rewardDescription, rewardAmountRemaining, rewardPointCost, rewardImage, isRewardActive, _id) {
      this.rewardName = rewardName;
      this.rewardDescription = rewardDescription;
      this.rewardAmountRemaining = rewardAmountRemaining;
      this.rewardPointCost = rewardPointCost;
      this.rewardImage = rewardImage;
      this.isRewardActive = isRewardActive;
      this._id = _id;
    }
  }