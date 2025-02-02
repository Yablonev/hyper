import React from 'react';
import {TabProps} from '../hyper';

export default class Tab extends React.PureComponent<TabProps> {
  constructor(props: TabProps) {
    super(props);
  }

  handleClick = (event: React.MouseEvent) => {
    const isLeftClick = event.nativeEvent.which === 1;

    if (isLeftClick && !this.props.isActive) {
      this.props.onSelect();
    }
  };

  handleMouseUp = (event: React.MouseEvent) => {
    const isMiddleClick = event.nativeEvent.which === 2;

    if (isMiddleClick) {
      this.props.onClose();
    }
  };

  render() {
    const {isActive, isFirst, isLast, borderColor, hasActivity} = this.props;

    return (
      <React.Fragment>
        <li
          onClick={this.props.onClick}
          style={{borderColor}}
          className={`tab_tab ${isFirst ? 'tab_first' : ''} ${isActive ? 'tab_active' : ''} ${
            isFirst && isActive ? 'tab_firstActive' : ''
          } ${hasActivity ? 'tab_hasActivity' : ''}`}
        >
          {this.props.customChildrenBefore}
          <span
            className={`tab_text ${isLast ? 'tab_textLast' : ''} ${isActive ? 'tab_textActive' : ''}`}
            onClick={this.handleClick}
            onMouseUp={this.handleMouseUp}
          >
            <span title={this.props.text} className="tab_textInner">
              {this.props.text}
            </span>
          </span>
          <i className="tab_icon" onClick={this.props.onClose}>
            <svg className="tab_shape">
              <use xlinkHref="./renderer/assets/icons.svg#close-tab" />
            </svg>
          </i>
          {this.props.customChildren}
        </li>

        <style jsx>{`
          .tab_tab {
            box-shadow: -1px 0px 0px 0px #475a7538;
            list-style-type: none;
            flex-grow: 1;
            position: relative;
          }

          .tab_first {

          }

          .tab_firstActive {
            padding-left: 0;
          }

          .tab_active {
            color: #fff;
          }

          .tab_active:hover {
            color: #fff;
          }

          .tab_hasActivity {
            color: #50e3c2;
          }

          .tab_hasActivity:hover {
            color: #50e3c2;
          }

          .tab_text {
            transition: color 0.2s ease;
            height: 34px;
            display: block;
            width: 100%;
            position: relative;
            overflow: hidden;
          }

          .tab_active .tab_textInner {
            color: #475a75;
          }

          .tab_textInner {
            position: absolute;
            left: 24px;
            right: 24px;
            top: 0;
            bottom: 0;
            text-align: center;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            color: #333;
            font-weight: 700;
          }

          .tab_active .tab_textInner[title="Yablonev IMac"]:after {
            background-image: url(../assets/imac_active.svg);
          }

          .tab_textInner[title="Yablonev IMac"]:after {
            content: '';
            background-image: url(../assets/imac.svg);
            margin-left: 3px;
            width: 14px;
            height: 14px;
            background-size: cover;
            z-index: 10;
            position: absolute;
            margin-top: 8px;
          }

          .tab_textInner[title="Yablonev Box"]:after {
            content: '';
            background-image: url(../assets/ssh.svg);
            margin-left: 6px;
            width: 14px;
            height: 14px;
            background-size: cover;
            z-index: 10;
            position: absolute;
            margin-top: 10px;
          }

          .tab_active .tab_textInner[title="Lucky Box"]:after, .tab_active .tab_textInner[title="Yablonev Box"]:after {
            background-image: url(../assets/ssh_active.svg);
          }

          .tab_textInner[title="Lucky Box"]:after {
            content: '';
            background-image: url(../assets/ssh.svg);
            margin-left: 6px;
            width: 14px;
            height: 14px;
            background-size: cover;
            z-index: 10;
            position: absolute;
            margin-top: 10px;
          }

          .tab_icon {
            transition: opacity 0.2s ease, color 0.2s ease, transform 0.25s ease, background-color 0.1s ease;
            pointer-events: none;
            position: absolute;
            right: 7px;
            top: 10px;
            display: inline-block;
            width: 14px;
            height: 14px;
            border-radius: 100%;
            color: #e9e9e9;
            opacity: 0;
            transform: scale(0.95);
          }

          .tab_icon:hover {
            background-color: rgba(255, 255, 255, 0.13);
            color: #fff;
          }

          .tab_icon:active {
            background-color: rgba(255, 255, 255, 0.1);
            color: #909090;
          }

          .tab_tab:hover .tab_icon {
            opacity: 1;
            transform: none;
            pointer-events: all;
          }

          .tab_shape {
            position: absolute;
            left: 4px;
            top: 4px;
            width: 6px;
            height: 6px;
            vertical-align: middle;
            fill: currentColor;
            shape-rendering: crispEdges;
          }
        `}</style>
      </React.Fragment>
    );
  }
}
