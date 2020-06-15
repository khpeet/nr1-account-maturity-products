class Host {
  constructor(entity) {
    // entity, entitySearch result model see apm-gql.js
    this.id = entity.guid;
    this.name = entity.name;
    this.guid = entity.guid;
    this.accountId = entity.accountId;

    this.reporting = entity.reporting;

    this.maxVersion =
      entity.tags && entity.tags.find(tag => tag.key === 'agentVersion')
        ? entity.tags.find(tag => tag.key === 'agentVersion').values[0]
        : '0.0.0';

    this.healthStatus = entity.alertSeverity;
    this.alertConditions = [];
    this.labels = [];
    if (entity.tags) {
      this.labels = entity.tags
        .map(tag => tag.key)
        .filter(
          key =>
            ['account', 'accountId', 'language', 'trustedAccountId'].indexOf(
              key
            ) === -1
        );
    }
  }

  isAlerting() {
    if (this.reporting) {
      if (
        this.healthStatus.indexOf('NOT_CONFIGURED') === -1 ||
        this.healthStatus.indexOf('') === -1
      ) {
        return true;
      }
    }
    return false;
  }

  hasLabels() {
    if (this.reporting) {
      if ((this.labels || []).length > 0) {
        return true;
      }
    }
    return false;
  }
}

export { Host };
