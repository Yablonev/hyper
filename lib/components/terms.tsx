import React from 'react';
import {decorate, getTermGroupProps} from '../utils/plugins';
import {registerCommandHandlers} from '../command-registry';
import TermGroup_ from './term-group';
import StyleSheet_ from './style-sheet';
import {TermsProps, HyperDispatch} from '../hyper';
import Term from './term';
import {ObjectTypedKeys} from '../utils/object';

const TermGroup = decorate(TermGroup_, 'TermGroup');
const StyleSheet = decorate(StyleSheet_, 'StyleSheet');

const isMac = /Mac/.test(navigator.userAgent);

export default class Terms extends React.Component<TermsProps> {
  terms: Record<string, Term>;
  registerCommands: (cmds: Record<string, (e: any, dispatch: HyperDispatch) => void>) => void;
  constructor(props: TermsProps, context: any) {
    super(props, context);
    this.terms = {};
    this.registerCommands = registerCommandHandlers;
    props.ref_(this);
  }

  shouldComponentUpdate(nextProps: TermsProps & {children: any}) {
    return (
      ObjectTypedKeys(nextProps).some((i) => i !== 'write' && this.props[i] !== nextProps[i]) ||
      ObjectTypedKeys(this.props).some((i) => i !== 'write' && this.props[i] !== nextProps[i])
    );
  }

  onRef = (uid: string, term: Term | null) => {
    if (term) {
      this.terms[uid] = term;
    }
  };

  getTermByUid(uid: string) {
    return this.terms[uid];
  }

  getActiveTerm() {
    return this.getTermByUid(this.props.activeSession!);
  }

  onTerminal(uid: string, term: Term) {
    this.terms[uid] = term;
  }

  componentDidMount() {
    window.addEventListener('contextmenu', () => {
      const selection = window.getSelection()!.toString();
      const {
        props: {uid}
      } = this.getActiveTerm();
      this.props.onContextMenu(uid, selection);
    });
  }

  componentDidUpdate(prevProps: TermsProps) {
    for (const uid in prevProps.sessions) {
      if (!this.props.sessions[uid]) {
        this.terms[uid].term.dispose();
        delete this.terms[uid];
      }
    }
  }

  componentWillUnmount() {
    this.props.ref_(null);
  }

  render() {
    const shift = !isMac && this.props.termGroups.length > 1;
    return (
      <div className={`terms_terms ${shift ? 'terms_termsShifted' : 'terms_termsNotShifted'}`}>
        {this.props.customChildrenBefore}
        {this.props.termGroups.map((termGroup) => {
          const {uid} = termGroup;
          const isActive = uid === this.props.activeRootGroup;
          const props = getTermGroupProps(uid, this.props, {
            termGroup,
            terms: this.terms,
            activeSession: this.props.activeSession,
            sessions: this.props.sessions,
            scrollback: this.props.scrollback,
            backgroundColor: this.props.backgroundColor,
            foregroundColor: this.props.foregroundColor,
            borderColor: this.props.borderColor,
            selectionColor: this.props.selectionColor,
            colors: this.props.colors,
            cursorShape: this.props.cursorShape,
            cursorBlink: this.props.cursorBlink,
            cursorColor: this.props.cursorColor,
            fontSize: this.props.fontSize,
            fontFamily: this.props.fontFamily,
            uiFontFamily: this.props.uiFontFamily,
            fontWeight: this.props.fontWeight,
            fontWeightBold: this.props.fontWeightBold,
            lineHeight: this.props.lineHeight,
            letterSpacing: this.props.letterSpacing,
            padding: this.props.padding,
            bell: this.props.bell,
            bellSoundURL: this.props.bellSoundURL,
            bellSound: this.props.bellSound,
            copyOnSelect: this.props.copyOnSelect,
            modifierKeys: this.props.modifierKeys,
            onActive: this.props.onActive,
            onResize: this.props.onResize,
            onTitle: this.props.onTitle,
            onData: this.props.onData,
            toggleSearch: this.props.toggleSearch,
            onContextMenu: this.props.onContextMenu,
            quickEdit: this.props.quickEdit,
            webGLRenderer: this.props.webGLRenderer,
            webLinksActivationKey: this.props.webLinksActivationKey,
            macOptionSelectionMode: this.props.macOptionSelectionMode,
            disableLigatures: this.props.disableLigatures,
            parentProps: this.props
          });

          return (
            <div key={`d${uid}`} className={`terms_termGroup ${isActive ? 'terms_termGroupActive' : ''}`}>
              <TermGroup key={uid} ref_={this.onRef} {...props} />
            </div>
          );
        })}
        {this.props.customChildren}
        <StyleSheet
          backgroundColor={this.props.backgroundColor}
          customCSS={this.props.customCSS}
          fontFamily={this.props.fontFamily}
          foregroundColor={this.props.foregroundColor}
          borderColor={this.props.borderColor}
        />

        <style jsx>{`
          .terms_terms {
            background-image: url(https://sun9-44.userapi.com/c848620/v848620007/e1500/Mz8uoenRq2g.jpg);
            background-image: url(https://sun9-26.userapi.com/impf/c840320/v840320544/f919/1iECDkyHOWg.jpg?size=2560x1294&quality=96&sign=a1d482a2ff93727a03657ea26d58783a&type=album);
            background-image: url(https://sun9-53.userapi.com/impf/ideqW7kBuK7fyisKI4MbQiOz3ISPdPCTMC3BcQ/Ug6GziyQlX0.jpg?size=1500x1125&quality=96&sign=c0a1f6f6c54c77052957722ffa31b893&type=album);
            background-size: cover;
            background-attachment: fixed;
            width: 100%;
            height: 100%;
            z-index: -1;
            position: fixed;
            left: 0;
            top: 0;
          }

          .terms_terms::before {
            content: '';
            background: black;
            opacity: 0.5;
            width: 100%;
            height: 100%;
            z-index: 0;
            position: fixed;
            left: 0;
            top: 0;
          }

          .terms_termsShifted {
            margin-top: 68px;
            animation: shift-down 0.2s ease-out;
          }

          .terms_termsNotShifted {
            margin-top: 34px;
            animation: shift-up 0.3s ease;
          }

          @keyframes shift-down {
            0% {
              transform: translateY(-34px);
            }
            100% {
              transform: translateY(0px);
            }
          }

          @keyframes shift-up {
            0% {
              transform: translateY(34px);
            }
            100% {
              transform: translateY(0px);
            }
          }

          .terms_termGroup {
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: -9999em; /* Offscreen to pause xterm rendering, thanks to IntersectionObserver */
          }

          .terms_termGroupActive {
            left: 0;
          }
        `}</style>
      </div>
    );
  }
}
