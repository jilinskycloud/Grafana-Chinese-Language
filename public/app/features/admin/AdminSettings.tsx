import React from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';

import { getBackendSrv } from '@grafana/runtime';
import { NavModel } from '@grafana/data';

import { StoreState } from 'app/types';
import { getNavModel } from 'app/core/selectors/navModel';
import Page from 'app/core/components/Page/Page';

type Settings = { [key: string]: { [key: string]: string } };

interface Props {
  navModel: NavModel;
}

interface State {
  settings: Settings;
  isLoading: boolean;
}

export class AdminSettings extends React.PureComponent<Props, State> {
  state: State = {
    settings: {},
    isLoading: true,
  };

  async componentDidMount() {
    const settings: Settings = await getBackendSrv().get('/api/admin/settings');
    this.setState({
      settings,
      isLoading: false,
    });
  }

  render() {
    const { settings, isLoading } = this.state;
    const { navModel } = this.props;

    return (
      <Page navModel={navModel}>
        <Page.Contents isLoading={isLoading}>
          <div className="grafana-info-box span8" style={{ margin: '20px 0 25px 0' }}>
            这些系统设置在grafana.ini或custom.ini中定义（或在ENV变量中覆盖）。要更改这些设置，您当前需要重新启动grafana
          </div>
          <table className="filter-table">
            <tbody>
              {Object.entries(settings).map(([sectionName, sectionSettings], i) => (
                <React.Fragment key={`section-${i}`}>
                  <tr>
                    <td className="admin-settings-section">{sectionName}</td>
                    <td />
                  </tr>
                  {Object.entries(sectionSettings).map(([settingName, settingValue], j) => (
                    <tr key={`property-${j}`}>
                      <td style={{ paddingLeft: '25px' }}>{settingName}</td>
                      <td style={{ whiteSpace: 'break-spaces' }}>{settingValue}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </Page.Contents>
      </Page>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  navModel: getNavModel(state.navIndex, 'server-settings'),
});

export default hot(module)(connect(mapStateToProps)(AdminSettings));
