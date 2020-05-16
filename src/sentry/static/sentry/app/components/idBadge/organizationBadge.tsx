import PropTypes from 'prop-types';
import React from 'react';

import BaseBadge from 'sentry/components/idBadge/baseBadge';
import BadgeDisplayName from 'sentry/components/idBadge/badgeDisplayName';
import SentryTypes from 'sentry/sentryTypes';
import {Organization} from 'sentry/types';
import OrganizationAvatar from 'sentry/components/avatar/organizationAvatar';

type DefaultProps = {
  avatarSize: OrganizationAvatar['props']['size'];
  // If true, will use default max-width, or specify one as a string
  hideOverflow: boolean | string;
  hideAvatar: boolean;
};

type Props = DefaultProps & {
  // A full organization is not used, but required to satisfy types with
  // withOrganization()
  organization: Organization;
  className?: string;
};

class OrganizationBadge extends React.Component<Props> {
  static propTypes = {
    ...BaseBadge.propTypes,
    organization: SentryTypes.Organization.isRequired,
    avatarSize: PropTypes.number,
    hideOverflow: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    hideAvatar: PropTypes.bool,
  };

  static defaultProps: DefaultProps = {
    avatarSize: 24,
    hideAvatar: false,
    hideOverflow: true,
  };

  render() {
    const {hideOverflow, organization, ...props} = this.props;

    return (
      <BaseBadge
        displayName={
          <BadgeDisplayName hideOverflow={hideOverflow}>
            {organization.slug}
          </BadgeDisplayName>
        }
        organization={organization}
        {...props}
      />
    );
  }
}

export default OrganizationBadge;
