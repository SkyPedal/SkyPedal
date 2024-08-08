export default class ActiveRewardModel {
    constructor(rewardId, userId, dateRedeemed, dateExpiry, hasUsed, id) {
      this.rewardId = rewardId;
      this.userId = userId;
      this.dateRedeemed = dateRedeemed;
      this.dateExpiry = dateExpiry;
      this.hasUsed = hasUsed;
      this.id = id;
    }
  }