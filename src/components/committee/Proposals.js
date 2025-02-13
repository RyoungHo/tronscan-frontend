import React from "react";
import {tu} from "../../utils/i18n";
import {upperFirst} from 'lodash'
import {Client} from "../../services/api";
import {Link} from "react-router-dom";
import SmartTable from "../common/SmartTable.js"
import {FormattedDate, FormattedTime, injectIntl} from "react-intl";
import {TronLoader} from "../common/loaders";
import {AddressLink} from "../common/Links";
import {ONE_TRX,IS_MAINNET} from "../../constants";

class Proposal extends React.Component {

    constructor() {
        super();
        this.state = {
            dataSource:[],
            total:0,
            loading: false,
        };
    }

    componentDidMount() {
        this.load();
    }

    onChange = (page, pageSize) => {
        this.load(page, pageSize);
    };

    load = async (page = 1, pageSize = 20) => {

        this.setState({ loading: true });

        let {proposal, total} = await Client.getProposalList({
            sort: '-number',
            limit: pageSize,
            start: (page-1) * pageSize,
        });
        let parametersArr = [
            'getMaintenanceTimeInterval',
            'getAccountUpgradeCost',
            'getCreateAccountFee',
            'getTransactionFee',
            'getAssetIssueFee',
            'getWitnessPayPerBlock',
            'getWitnessStandbyAllowance',
            'getCreateNewAccountFeeInSystemContract',
            'getCreateNewAccountBandwidthRate',
            'getAllowCreationOfContracts',
            'getRemoveThePowerOfTheGr',
            'getEnergyFee',
            'getExchangeCreateFee',
            'getMaxCpuTimeOfOneTx',
            'getAllowUpdateAccountName',
            'getAllowSameTokenName',
            'getAllowDelegateResource',
            'getTotalEnergyLimit',
            'getAllowTvmTransferTrc10',
            'getTotalEnergyLimitNew',
            'getAllowMultiSign',
           // 'getTotalEnergyCurrentLimit',
            'getAllowAdaptiveEnergy',
            //'getTotalEnergyTargetLimit',
            //'getTotalEnergyAverageUsage',
            'getUpdateAccountPermissionFee',
            'getMultiSignFee',
            'getAllowProtoFilterNum',
            '',
            'getAllowTvmConstantinople',
            '',
            '',
            '',
            'getChangeDelegation',
            'getWitness127PayPerBlock',
        ];

        let sunsideArr = [
            {
                id:'1000000',
                key:'getChargingSwitch',
            },
            {
                id:'1000001',
                key:'getSideChainGateWayList',
            },
            {
                id:'1000003',
                key:'getProposalExpireTime',
            },
            {
                id:'1000004',
                key:'getVoteWitnessSwitch',
            },
            {
                id:'1000007',
                key:'getFundInjectAddress',
            },
            {
                id:'1000008',
                key:'getFundDistributeEnableSwitch',
            },
            {
                id:'1000009',
                key:'getDayToSustainByFund',
            },
            {
                id:'1000010',
                key:'getPercentToPayWitness',
            },

        ]
        if(IS_MAINNET){
            for(let item in proposal){
                for(let j in proposal[item]['paramters']){
                    console.log(proposal[item]['paramters']);
                    proposal[item]['paramters'][j]['proposalKey'] = parametersArr[proposal[item]['paramters'][j]['key']];
                    proposal[item]['paramters'][j]['proposalVal'] = proposal[item]['paramters'][j]['value'];
                }
            }
        }else{
            for(let item in proposal){
                for(let j in proposal[item]['paramters']){
                    for(let i in sunsideArr){
                        if(sunsideArr[i]['id']== proposal[item]['paramters'][j]['key']){
                             proposal[item]['paramters'][j]['proposalKey'] = sunsideArr[i]['key'];
                             proposal[item]['paramters'][j]['proposalVal'] = proposal[item]['paramters'][j]['value'];
                        }
                    }
                }
            }
        }
        this.setState({
            loading: false,
            dataSource: proposal,
            total,
            page
        })

    };

    getColumns() {
        let { intl } = this.props;
        let { dataSource } = this.state;

        const columns = [{
            title: upperFirst(intl.formatMessage({id: 'propose_number'})),
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => {
                return  '#' +record.proposalId
            }
        },
        {
            title: upperFirst(intl.formatMessage({id: 'proposal_content_info'})),
            dataIndex: 'proposalVal',
            key: 'proposalVal',
            width:'40%',
            render: (text, record, index) => {
                return  <div>
                    {
                        record.paramters.map((item,index)=>{
                            return <div key={index}>
                                {
                                    IS_MAINNET?<div>
                                        {
                                            item.proposalKey == 'getMaintenanceTimeInterval' &&
                                            <div>
                                                <span>{ intl.formatMessage({id: 'propose_1'})}</span>
                                                <span>{ intl.formatMessage({id: 'proposal_to'})}</span>
                                                <span>{ item.proposalVal / (1000 * 60 * 60)}</span> &nbsp;
                                                <span>{intl.formatMessage({id: "propose_hour"})}</span>
                                            </div>
                                        }
                                        {
                                            item.proposalKey == 'getAccountUpgradeCost' &&
                                            <div>
                                                <span>{ intl.formatMessage({id: 'propose_2'})}</span>
                                                <span>{ intl.formatMessage({id: 'proposal_to'})}</span>
                                                <span>{item.proposalVal / ONE_TRX}</span> &nbsp;
                                                <span>TRX</span>
                                            </div>
                                        }
                                        {
                                            item.proposalKey == 'getCreateAccountFee' &&
                                            <div>
                                                <span>{ intl.formatMessage({id: 'propose_3'})}</span>
                                                <span>{ intl.formatMessage({id: 'proposal_to'})}</span>
                                                <span>{item.proposalVal / ONE_TRX}</span> &nbsp;
                                                <span>TRX</span>
                                            </div>
                                        }
                                        {
                                            record.proposalKey == 'getTransactionFee' &&
                                            <div>
                                                <span>{ intl.formatMessage({id: 'propose_4'})}</span>
                                                <span>{ intl.formatMessage({id: 'proposal_to'})}</span>
                                                <span>{ item.proposalVal }</span> &nbsp;
                                                <span>Sun/byte</span>
                                            </div>
                                        }
                                        {
                                            item.proposalKey == 'getAssetIssueFee' &&
                                            <div>
                                                <span>{ intl.formatMessage({id: 'propose_5'})}</span>
                                                <span>{ intl.formatMessage({id: 'proposal_to'})}</span>
                                                <span>{item.proposalVal / ONE_TRX}</span> &nbsp;
                                                <span>TRX</span>
                                            </div>
                                        }
                                        {
                                            item.proposalKey == 'getWitnessPayPerBlock' &&
                                            <div>
                                                <div>
                                                    <span>{ intl.formatMessage({id: 'propose_6'})}</span>
                                                    <span>{ intl.formatMessage({id: 'proposal_to'})}</span>
                                                    <span>{item.proposalVal / ONE_TRX}</span> &nbsp;
                                                    <span>TRX</span>
                                                </div>
                                            </div>
                                        }
                                        {
                                            item.proposalKey == 'getWitnessStandbyAllowance' &&
                                            <div>
                                                <span>{ intl.formatMessage({id: 'propose_7'})}</span>
                                                <span>{ intl.formatMessage({id: 'proposal_to'})}</span>
                                                <span>{ item.proposalVal / ONE_TRX}</span> &nbsp;
                                                <span>TRX</span></div>
                                        }
                                        {
                                            item.proposalKey == 'getCreateNewAccountFeeInSystemContract' &&
                                            <div>
                                                <span>{ intl.formatMessage({id: 'propose_8'})}</span>
                                                <span>{ intl.formatMessage({id: 'proposal_to'})}</span>
                                                <span>{ item.proposalVal / ONE_TRX}</span> &nbsp;
                                                <span>TRX</span></div>
                                        }
                                        {
                                            item.proposalKey == 'getCreateNewAccountBandwidthRate' &&
                                            <div>
                                                <span>{ intl.formatMessage({id: 'propose_9'})}</span>
                                                <span>{ intl.formatMessage({id: 'proposal_to'})}</span>
                                                <span>{ item.proposalVal }</span> &nbsp;
                                                <span>bandwith/byte</span>
                                            </div>
                                        }
                                        {
                                            item.proposalKey == 'getAllowCreationOfContracts' &&
                                            <div>
                                                <span>{ intl.formatMessage({id: 'propose_10'})}</span>
                                                <span>{tu('propose_activate')}</span>
                                            </div>
                                        }
                                        {
                                            item.proposalKey == 'getRemoveThePowerOfTheGr' &&
                                            <div>
                                                <span>{ intl.formatMessage({id: 'propose_11'})}</span>
                                            </div>
                                        }
                                        {
                                            item.proposalKey == 'getEnergyFee' &&
                                            <div>
                                                <span>{ intl.formatMessage({id: 'propose_12'})}</span>
                                                <span>{ intl.formatMessage({id: 'proposal_to'})}</span>
                                                <span>{ item.proposalVal / ONE_TRX} TRX</span>
                                            </div>
                                        }
                                        {
                                            item.proposalKey == 'getExchangeCreateFee' &&
                                            <div>
                                                <span>{ intl.formatMessage({id: 'propose_13'})}</span>
                                                <span>{ intl.formatMessage({id: 'proposal_to'})}</span>
                                                <span>{ item.proposalVal / ONE_TRX} TRX</span>
                                            </div>
                                        }
                                        {
                                            item.proposalKey == 'getMaxCpuTimeOfOneTx' &&
                                            <div>
                                                <span>{ intl.formatMessage({id: 'propose_14'})}</span>
                                                <span>{ intl.formatMessage({id: 'proposal_to'})}</span>
                                                <span>{ item.proposalVal } ms</span>
                                            </div>
                                        }
                                        {
                                            item.proposalKey == 'getAllowUpdateAccountName' &&
                                            <div>
                                                <span>{ intl.formatMessage({id: 'propose_15'})}</span>
                                                <span>{ intl.formatMessage({id: 'proposal_to'})}</span>
                                                {
                                                    item.proposalVal? <span>{tu('propose_allowed')}</span>:
                                                        <span>{tu('propose_not_allowed')}</span>
                                                }
                                            </div>
                                        }
                                        {
                                            item.proposalKey == 'getAllowSameTokenName' &&
                                            <div>
                                                <span>{ intl.formatMessage({id: 'propose_16'})}</span>
                                                <span>{ intl.formatMessage({id: 'proposal_to'})}</span>
                                                {
                                                    item.proposalVal? <span>{tu('propose_allowed')}</span>:
                                                        <span>{tu('propose_not_allowed')}</span>
                                                }
                                            </div>
                                        }
                                        {
                                            item.proposalKey == 'getAllowDelegateResource' &&
                                            <div>
                                                <span>{ intl.formatMessage({id: 'propose_17'})}</span>
                                                <span>{ intl.formatMessage({id: 'proposal_to'})}</span>
                                                {
                                                    item.proposalVal? <span>{tu('propose_allowed')}</span>:
                                                        <span>{tu('propose_not_allowed')}</span>
                                                }
                                            </div>
                                        }
                                        {
                                            item.proposalKey == 'getTotalEnergyLimit' &&
                                            <div>
                                                <span>{ intl.formatMessage({id: 'propose_18'})}</span>
                                                <span>{ intl.formatMessage({id: 'proposal_to'})}</span>
                                                <span>{ item.proposalVal }</span>
                                            </div>
                                        }
                                        {
                                            item.proposalKey == 'getAllowTvmTransferTrc10' &&
                                            <div>
                                                <span>{ intl.formatMessage({id: 'propose_19'})}</span>
                                                <span>{ intl.formatMessage({id: 'proposal_to'})}</span>
                                                {
                                                    item.proposalVal? <span>{tu('propose_allowed')}</span>:
                                                        <span>{tu('propose_not_allowed')}</span>
                                                }
                                            </div>
                                        }
                                        {
                                            item.proposalKey == 'getTotalEnergyLimitNew' &&
                                            <div>
                                                <span>{ intl.formatMessage({id: 'propose_18_1'})}</span>
                                                <span>{ intl.formatMessage({id: 'proposal_to'})}</span>
                                                <span>{ item.proposalVal }</span>
                                            </div>
                                        }
                                        {
                                            item.proposalKey == 'getTotalEnergyCurrentLimit' &&
                                            <div>
                                                <span>{ intl.formatMessage({id: 'propose_20'})}</span>
                                                <span>{ intl.formatMessage({id: 'proposal_to'})}</span>
                                                <span>{ item.proposalVal }</span>
                                            </div>
                                        }
                                        {
                                            item.proposalKey == 'getAllowMultiSign' &&
                                            <div>
                                                <span>{ intl.formatMessage({id: 'propose_21'})}</span>
                                                <span>{ intl.formatMessage({id: 'proposal_to'})}</span>
                                                {
                                                    item.proposalVal? <span>{tu('propose_allowed')}</span>:
                                                        <span>{tu('propose_not_allowed')}</span>
                                                }
                                            </div>
                                        }
                                        {
                                            item.proposalKey == 'getAllowAdaptiveEnergy' &&
                                            <div>
                                                <span>{ intl.formatMessage({id: 'propose_22'})}</span>
                                                <span>{ intl.formatMessage({id: 'proposal_to'})}</span>
                                                {
                                                    item.proposalVal? <span>{tu('propose_allowed')}</span>:
                                                        <span>{tu('propose_not_allowed')}</span>
                                                }
                                            </div>
                                        }
                                        {
                                            item.proposalKey == 'getTotalEnergyTargetLimit' &&
                                            <div>
                                                <span>{ intl.formatMessage({id: 'propose_23'})}</span>
                                                <span>{ intl.formatMessage({id: 'proposal_to'})}</span>
                                                <span>{item.proposalVal}</span>/
                                                <span>{tu('propose_minute')}</span>
                                            </div>
                                        }
                                        {
                                            item.proposalKey == 'getTotalEnergyAverageUsage' &&
                                            <div>
                                                <span>{ intl.formatMessage({id: 'propose_24'})}</span>
                                                <span>{ intl.formatMessage({id: 'proposal_to'})}</span>
                                                {
                                                    item.proposalVal?<span><span>{item.proposalVal}</span>/<span>{tu('propose_minute')}</span></span>:
                                                        <span>{tu('propose_unactivate')}</span>
                                                }
                                            </div>
                                        }
                                        {
                                            item.proposalKey == 'getUpdateAccountPermissionFee' &&
                                            <div>
                                                <span>{ intl.formatMessage({id: 'propose_25'})}</span>
                                                <span>{ intl.formatMessage({id: 'proposal_to'})}</span>
                                                <span>{item.proposalVal / ONE_TRX}</span> &nbsp;
                                                <span>TRX</span>
                                            </div>
                                        }
                                        {
                                            item.proposalKey == 'getMultiSignFee' &&
                                            <div>
                                                <span>{ intl.formatMessage({id: 'propose_26'})}</span>
                                                <span>{ intl.formatMessage({id: 'proposal_to'})}</span>
                                                <span>{item.proposalVal / ONE_TRX}</span> &nbsp;
                                                <span>TRX</span>
                                            </div>
                                        }

                                        {
                                            item.proposalKey == 'getAllowProtoFilterNum' &&
                                            <div>
                                                <span>{ intl.formatMessage({id: 'propose_27'})}</span>
                                                <span>{ intl.formatMessage({id: 'proposal_to'})}</span>
                                                {
                                                    item.proposalVal? <span>{tu('propose_activate')}</span>:
                                                        <span>{tu('propose_unactivate')}</span>
                                                }
                                            </div>
                                        }
                                        {
                                            item.proposalKey == 'getAllowTvmConstantinople' &&
                                            <div>
                                                <span>{ intl.formatMessage({id: 'propose_28'})}</span>
                                                <span>{ intl.formatMessage({id: 'proposal_to'})}</span>
                                                {
                                                    item.proposalVal? <span>{tu('propose_allowed')}</span>:
                                                        <span>{tu('propose_not_allowed')}</span>
                                                }
                                            </div>
                                        }
                                        {
                                            item.proposalKey == 'getChangeDelegation' &&
                                            <div>
                                                <span>{ intl.formatMessage({id: 'propose_30'})}</span>
                                                <span>{ intl.formatMessage({id: 'proposal_to'})}</span>
                                                {
                                                    item.proposalVal? <span>{tu('propose_activate')}</span>:
                                                        <span>{tu('propose_unactivate')}</span>
                                                }
                                            </div>
                                        }
                                        {

                                            item.proposalKey == 'getWitness127PayPerBlock' &&
                                            <div className="mt-1">
                                                <span>{ intl.formatMessage({id: 'propose_31'})}</span>
                                                <span>{ intl.formatMessage({id: 'proposal_to'})}</span>
                                                <span>{ item.proposalVal / ONE_TRX}</span> &nbsp;
                                                <span>TRX</span>
                                            </div>

                                        }
                                    </div>:<div>
                                        {
                                            item.proposalKey == 'getChargingSwitch' && <div>
                                                <span>{ intl.formatMessage({id: 'sun_propose_1'})}</span>
                                                <span>{ intl.formatMessage({id: 'proposal_to'})}</span>
                                                {
                                                    item.proposalVal != '0'? <span>{tu('propose_activate')}</span>:
                                                        <span>{tu('propose_unactivate')}</span>
                                                }
                                            </div>
                                        }
                                        {
                                            item.proposalKey == 'getSideChainGateWayList' && <div>
                                                <span>{ intl.formatMessage({id: 'sun_propose_2'})}</span>
                                                <span>{ intl.formatMessage({id: 'proposal_to'})}</span>
                                                {
                                                    <span>{item.proposalVal}</span>
                                                }
                                            </div>
                                        }
                                        {
                                            item.proposalKey == 'getProposalExpireTime' && <div>
                                                <span>{ intl.formatMessage({id: 'sun_propose_3'})}</span>
                                                <span>{ intl.formatMessage({id: 'proposal_to'})}</span>
                                                {
                                                    <span>{item.proposalVal}</span>
                                                }
                                            </div>
                                        }
                                        {
                                            item.proposalKey == 'getVoteWitnessSwitch' && <div>
                                                <span>{ intl.formatMessage({id: 'sun_propose_4'})}</span>
                                                <span>{ intl.formatMessage({id: 'proposal_to'})}</span>
                                                {
                                                    item.proposalVal != '0'? <span>{tu('propose_activate')}</span>:
                                                        <span>{tu('propose_unactivate')}</span>
                                                }
                                            </div>
                                        }
                                        {
                                            item.proposalKey == 'getFundInjectAddress' && <div>
                                                <span>{ intl.formatMessage({id: 'sun_propose_5'})}</span>
                                                <span>{ intl.formatMessage({id: 'proposal_to'})}</span>
                                                {
                                                    <span>{item.proposalVal}</span>
                                                }
                                            </div>
                                        }
                                        {
                                            item.proposalKey == 'getFundDistributeEnableSwitch' && <div>
                                                <span>{ intl.formatMessage({id: 'sun_propose_6'})}</span>
                                                <span>{ intl.formatMessage({id: 'proposal_to'})}</span>
                                                {
                                                    item.proposalVal != '0'? <span>{tu('propose_activate')}</span>:
                                                        <span>{tu('propose_unactivate')}</span>
                                                }
                                            </div>
                                        }
                                        {
                                            item.proposalKey == 'getDayToSustainByFund' && <div>
                                                <span>{ intl.formatMessage({id: 'sun_propose_7'})}</span>
                                                <span>{ intl.formatMessage({id: 'proposal_to'})}</span>
                                                {
                                                    <span>{item.proposalVal} {tu('day')}</span>
                                                }
                                            </div>
                                        }
                                        {
                                            item.proposalKey == 'getPercentToPayWitness' && <div>
                                                <span>{ intl.formatMessage({id: 'sun_propose_8'})}</span>
                                                <span>{ intl.formatMessage({id: 'proposal_to'})}</span>
                                                {
                                                    <span>{item.proposalVal} %</span>
                                                }
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                        })


                    }


                </div>
            }
        },
        {
            title: upperFirst(intl.formatMessage({id: 'proposer'})),
            dataIndex: 'name',
            key: 'name',
            width:'15%',
            render: (text, record, index) => {
                return ( record.proposer.name?
                    <AddressLink address={record.proposer.address}>{record.proposer.name}</AddressLink>:
                    <AddressLink address={record.proposer.address}>{record.proposer.address}</AddressLink>

                )
            }
        },
        {
            title: upperFirst(intl.formatMessage({id: 'proposal_time_of_creation'})),
            dataIndex: 'createTime',
            key: 'createTime',
            width:'15%',
            render: (text, record, index) => {
                return <span>
                        <FormattedDate value={Number(text)}/>&nbsp;
                        <FormattedTime value={Number(text)}  hour='numeric' minute="numeric" second='numeric' hour12={false}/>&nbsp;
                </span>
            }

        },

        {
            title:upperFirst(intl.formatMessage({id: 'proposal_status'})),
            dataIndex: 'state',
            key: 'state',
            render: (text, record, index) => {
                return <div>
                    {
                        text == 'PENDING' &&
                        <div>
                            <span className="badge badge-warning text-uppercase badge-success-radius">{tu("proposal_voting")}</span>
                        </div>
                    }
                    {
                        text == 'DISAPPROVED' &&
                        <div>
                            <span className="badge badge-danger text-uppercase badge-success-radius">{tu("proposal_ineffective")}</span>
                        </div>
                    }
                    {
                        text == 'APPROVED' &&
                        <div>
                            <span className="badge badge-success text-uppercase badge-success-radius">{tu("proposal_effective")}</span>
                        </div>
                    }
                    {
                        text == 'CANCELED' &&
                        <div>
                            <span className="badge badge-secondary text-uppercase badge-success-radius">{tu("proposal_cancelled")}</span>
                        </div>
                    }
                </div>
            }
        },
        {
            title:"",
            dataIndex: 'details',
            key: 'details',
            width:'12%',
            render: (text, record, index) => {
                return (
                    <Link
                        to={`/proposal/${record.proposalId}`}
                        className="float-right text-primary btn btn-default btn-sm">
                        {tu("learn_more")}
                    </Link>

                )
            }
        }];

        return columns
    }

    async proposalDetails (){

    }

    render() {

        let {page, total, pageSize, loading, dataSource, emptyState: EmptyState = null} = this.state;
        let column = this.getColumns();
        let {intl} = this.props;

        let tableInfo = intl.formatMessage({id: 'view_total'}) + ' ' + total + ' ' + intl.formatMessage({id: 'token_unit'})
        let locale  = {emptyText: intl.formatMessage({id: 'no_commission_proposed_found'})}



        return (
            <main className="container header-overlap committee">
                <div className="token_black table_pos">
                    {loading && <div className="loading-style"><TronLoader/></div>}
                    {!loading&&<SmartTable bordered={true} column={column} data={dataSource} total={dataSource.length} locale={locale} />}
                </div>
            </main>
        )
    }
}


export default injectIntl(Proposal);
