import React from 'react';
import {Location, LocationDescriptor} from 'history';

import {t} from 'sentry/locale';
import {Organization} from 'sentry/types';
import Breadcrumbs, {Crumb} from 'sentry/components/breadcrumbs';
import {decodeScalar} from 'sentry/utils/queryString';

import {getPerformanceLandingUrl} from './utils';
import {transactionSummaryRouteWithQuery} from './transactionSummary/utils';

type Props = {
  organization: Organization;
  location: Location;
  transactionName?: string;
  eventSlug?: string;
};

class Breadcrumb extends React.Component<Props> {
  getCrumbs() {
    const crumbs: Crumb[] = [];
    const {organization, location, transactionName, eventSlug} = this.props;

    const performanceTarget: LocationDescriptor = {
      pathname: getPerformanceLandingUrl(organization),
      query: {
        ...location.query,
        // clear out the transaction name
        transaction: undefined,
      },
    };

    crumbs.push({
      to: performanceTarget,
      label: t('Performance'),
      preserveGlobalSelection: true,
    });

    if (transactionName) {
      const summaryTarget = transactionSummaryRouteWithQuery({
        orgSlug: organization.slug,
        transaction: transactionName,
        projectID: decodeScalar(location.query.project),
        query: location.query,
      });

      crumbs.push({
        to: summaryTarget,
        label: t('Transaction Summary'),
        preserveGlobalSelection: true,
      });
    }

    if (transactionName && eventSlug) {
      crumbs.push({
        to: '',
        label: t('Event Details'),
      });
    }

    return crumbs;
  }

  render() {
    return <Breadcrumbs crumbs={this.getCrumbs()} />;
  }
}

export default Breadcrumb;
