export default class ActiveRewardModel {
    constructor( rewardName, rewardId, userId, dateRedeemed, dateExpiry, hasUsed, id ) {
      this.rewardName = rewardName
      this.rewardId = rewardId;
      this.userId = userId;
      this.dateRedeemed = dateRedeemed;
      this.dateExpiry = dateExpiry;
      this.hasUsed = hasUsed;
      this.id = id;
    }
  }