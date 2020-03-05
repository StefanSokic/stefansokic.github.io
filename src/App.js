import React from 'react';
import ReactPlayer from 'react-player'
import styled from 'styled-components';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import './App.css';

import Icon from './components/Icon';
import Alert from './components/Alert';
import List from './components/List';
import Modal from './components/Modal';
import TextArea from './components/TextArea';
import Footer from './components/Footer';

import resumePdf from './resume.pdf'
import clouds from "./windows-95-clouds.jpg";
import shutdown from "./shutdown.jpg"
import logo from "./windows-95-logo.png";

// TODO: enums to alerts to open

const Link = styled.a`
  text-decoration: none;
  color: #000;
`;

const LinkUnderlined = styled.a`
  color: #000;
`;

const CoverBackground = styled.img`
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100vh;
  min-width: 100vw;
  z-index: 10000000000;
`;

const LogoSvg = styled.img`
  position: fixed;
  margin: auto;
  top: 30vh;
  left: 37.5vw;
  min-width: 25vw;
  z-index: 100000000000;
`;

const IconBox = styled.li`
  padding: 6px 0;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IconList = styled.ul`
  height: 100%;
  width: 5.5em;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  margin: 0.2em;
`;

const IconListRow = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const IconBoxMyComputer = styled.div`
  padding: 6px 0;
  display: flex;
  width: 6em;
  height: 4em;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WhiteSpace = styled.div`
  border: none;
  // max-height: 100%;
  border-left: 1px solid #868a8e;
  border-top: 1px solid #868a8e;
  width: 100%;
  height: 100%;

  ${({ width, height }) => `width: ${width}px; height: ${height}px;`}

  background-color: #fff;

  outline: none;
  resize: none;

  box-shadow: inset -1px -1px 0 0 #c3c7cb, inset 1px 1px 0 0 #000000,
    0.5px 0.5px 0 0.5px #ffffff;
`;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isStartMenuOpen: true,
      isNotepadOpen: true,
      isWelcomeAlertOpen: true,
      isWelcomeVideoOpen: true,
      isResumePDFOpen: true,
      isWhyModalOpen: true,
      isMyComputerOpen: true,
      isControlPanelOpen: true,
      isControlPanelAlertOpen: true,
      isAwfulExperienceVideoOpen: true,
      isDocumentsOpen: true,
      isLiarPngOpen: true,
      isFloppyAlertOpen: true,
      isCDriveAlertOpen: true,
      isDDriveAlertOpen: true,
      isDialUpAlertOpen: true,
      isPrintersAlertOpen: true,
      isBooksModalOpen: true,
      isMoviesModalOpen: true,
      isRecipesModalOpen: true,
      isHelpAlertOpen: true,
      isMobileWarningOpen: false,
      notepadTextValue: "",
      startingUp: true,
      shuttingDown: false,
      // ex. [isNotePadOpen, isDocumentsOpen, ...], front of stack is highest z-index and on top visually
      modalPriorityStack: ["isMobileWarningOpen", "isWelcomeAlertOpen","isWelcomeVideoOpen"],
    }
  }

  componentDidMount() {
    this.setState({
      isStartMenuOpen: false,
      isNotepadOpen: false,
      isControlPanelAlertOpen: false,
      isAwfulExperienceVideoOpen: false,
      isResumePDFOpen: false,
      isWhyModalOpen: false,
      isMyComputerOpen:false,
      isDocumentsOpen: false,
      isControlPanelOpen: false,
      isLiarPngOpen: false,
      isFloppyAlertOpen: false,
      isCDriveAlertOpen: false,
      isDDriveAlertOpen: false,
      isHelpAlertOpen: false,
      isDialUpAlertOpen: false,
      isPrintersAlertOpen: false,
      isBooksModalOpen: false,
      isMoviesModalOpen: false,
      isRecipesModalOpen: false,
    })
    setInterval(
      () => this.setState({startingUp: false}),
      3000
    );
    window.addEventListener("windowSize", this.windowSize.bind(this));
    this.windowSize();
  }

  windowSize() {
    this.setState({isMobileWarningOpen: window.innerWidth <= 760});
  }

  updateModal(modalType, val) {
    let newModalPriorityStack = this.state.modalPriorityStack;
    if (val) {
      // add to stack
      if (this.state.modalPriorityStack.includes(modalType)) {
        // bring new modal to front
        newModalPriorityStack = newModalPriorityStack.filter(modal => modal !== modalType);
        newModalPriorityStack.unshift(modalType);
      } else {
        // add new modal to head
        newModalPriorityStack.unshift(modalType);
      }
    } else {
      // remove modal from stack
      newModalPriorityStack = newModalPriorityStack.filter(modal => modal !== modalType)
    }
    this.setState({
      [modalType]: val,
      modalPriorityStack: newModalPriorityStack,
    })
  }

  handleChange(val) {
    this.setState({
      notepadTextValue: val,
    })
  }

  getModalPriority(modalType) {
    let modalIndex = this.state.modalPriorityStack.indexOf(modalType)
    if (modalIndex !== -1) {
      return 1000 * (this.state.modalPriorityStack.length - modalIndex)
    }
    return 0
  }

  // TODO: there should also be an openModal() function
  closeModal(event, modalType) {
    event.preventDefault();
    event.stopPropagation();
    this.updateModal(modalType, false);
  }

  renderWelcomeAlert() {
    if (!this.state.isWelcomeAlertOpen) return;
    return <Alert 
      title="Welcome" 
      type="info" 
      message="Hi my name is Stefan and yes this is my personal site. Have fun exploring!" 
      closeAlert={() => this.updateModal("isWelcomeAlertOpen", false)}
      priority={this.getModalPriority("isWelcomeAlertOpen")}
      onClickHandler={() => this.updateModal("isWelcomeAlertOpen", true)}
      closeAlert={(e) => this.closeModal(e, "isWelcomeAlertOpen")}
      >
      Click me!
      </Alert>;
  }

  renderMobileWarning() {
    if (!this.state.isMobileWarningOpen) return;
    return <Alert 
      title="pls stop" 
      type="warning" 
      x={0}
      y={200}
      message="Windows 95 wasn't designed for mobile. Switch to desktop or suffer." 
      closeAlert={() => this.updateModal("isMobileWarningOpen", false)}
      priority={this.getModalPriority("isMobileWarningOpen")}
      onClickHandler={() => this.updateModal("isMobileWarningOpen", true)}
      closeAlert={(e) => this.closeModal(e, "isMobileWarningOpen")}
      >
      Click me!
      </Alert>;
  }

  renderControlPanelAlert() {
    if (!this.state.isControlPanelAlertOpen) return;
    return <Alert 
      title="Error" 
      type="error" 
      message="Yeah, like I said, this does nothing" 
      closeAlert={() => this.updateModal("isControlPanelAlertOpen", false)}
      priority={this.getModalPriority("isControlPanelAlertOpen")}
      onClickHandler={() => this.updateModal("isControlPanelAlertOpen", true)}
      closeAlert={(e) => this.closeModal(e, "isControlPanelAlertOpen")}
      >
      Ok Thanks
      </Alert>;
  }

  renderStartMenu() {
    if (!this.state.isStartMenuOpen) {
      return;
    }
    return (
    <List id="start-menu">
        <List.Item icon="folder_exe2">
          <List>
            <List.Item 
              icon="notepad"
              onClick={() => this.updateModal("isNotepadOpen", true)}
              >
              Notepad
            </List.Item>
            <List.Item 
              icon="file_text"
              onClick={() => this.updateModal("isWhyModalOpen", true)}
              >
              Why.txt
            </List.Item>
            <List.Item 
              icon="wordpad"
              onClick={() => this.updateModal("isResumePDFOpen", true)}
              >
              Resume.pdf
            </List.Item>
            <List.Item 
              icon="recycle_full"
              onClick={() => this.updateModal("isRecycleBinOpen", true)}
              >
              Recycle Bin
            </List.Item>
          </List>
          Programs
        </List.Item>
        <List.Item 
          icon="folder_file"
          onClick={() => this.updateModal("isDocumentsOpen", true)}
          >
          Documents
        </List.Item>
        <List.Item icon="settings">
          <List>
            <List.Item 
              icon="folder_settings" 
              onClick={() => this.updateModal("isControlPanelOpen", true)}>
              Control Panel
            </List.Item>
            <List.Item 
              icon="folder_print"
              onClick={() => this.updateModal("isPrintersAlertOpen", true)}
              >Printers</List.Item>
          </List>
          Settings
        </List.Item>
        {/* <List.Item icon="file_find">Find</List.Item> */}
        <Link target="_blank" href="https://github.com/StefanSokic">
          <List.Item icon="shortcut2">My Github</List.Item>
        </Link>
        <Link target="_blank" href="https://www.linkedin.com/in/stefan-sokic-84985098/">
          <List.Item icon="shortcut2">My LinkedIn</List.Item>
          </Link>
        <List.Item 
          icon="help_book"
          onClick={() => this.updateModal("isHelpAlertOpen", true)}
          >
          Help
        </List.Item>
        <List.Divider />
        <List.Item 
          onClick={() => this.setState({shuttingDown: true})} // TODO: either link to "are you sure" window or close all tabs before displaying image
          icon="computer_3">
          Shut Down...
          </List.Item>
      </List>
    )
  }

  renderNotepad() {
    if (!this.state.isNotepadOpen) return;
    return (
      <Modal
        icon="notepad"
        title="Untitled - Notepad"
        closeModal={(e) => this.closeModal(e, "isNotepadOpen")}
        height={250}
        priority={this.getModalPriority("isNotepadOpen")}
        onClickHandler={() => this.updateModal("isNotepadOpen", true)}
        menu={[
          {
            name: 'File',
            list: (
              <List>
                <List.Item 
                  onClick={(e) => this.closeModal(e, "isNotepadOpen")}
                  >
                  Exit
                </List.Item>
              </List>
            ),
          },
          // {
          //   name: 'Edit',
          //   // list: (
          //     // <List>
          //     //   <List.Item>Copy</List.Item>
          //     // </List>
          //   // ),
          // },
        ]}
        >
        <TextArea value={this.state.notepadTextValue} onChange={(e) => this.handleChange(e.target.value)} rows={10} cols={20} />
      </Modal>
    )
  }

  renderResumePDF() {
    if (!this.state.isResumePDFOpen) return;
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    return (
      <Modal
        icon="wordpad"
        title="Resume.pdf"
        closeModal={(e) => this.closeModal(e, "isResumePDFOpen")}
        height="585"
        width="440"
        priority={this.getModalPriority("isResumePDFOpen")}
        onClickHandler={() => this.updateModal("isResumePDFOpen", true)}
        >
        <Document file={resumePdf}> <Page scale={0.7} pageNumber={1} />  </Document>
      </Modal>
    )
  }

  renderWhyModal() {
    if (!this.state.isWhyModalOpen) return;
    return (
      <Modal
        icon="file_text"
        title="Why.txt"
        closeModal={(e) => this.closeModal(e, "isWhyModalOpen")}
        buttons={[
          { value: 'Ok Thanks', onClick: (e) => this.closeModal(e, "isWhyModalOpen")},
        ]}
        height="500"
        width="430"
        priority={this.getModalPriority("isWhyModalOpen")}
        onClickHandler={() => this.updateModal("isWhyModalOpen", true)}
        >
        <WhiteSpace>
          <img src="https://media.giphy.com/media/l3q2zbskZp2j8wniE/giphy.gif"/>
          <div id="why-modal-text">
            Why would I do this to you/myself?
            <br></br>
            Because <span id="strikethrough">I clearly have too much time on my hands.</span> Windows 95 is my favourite interface of all time. It was the first GUI to introduce the concept of the desktop, taskbar, start menu, and file manager - all of which remain present in current Windows versions. It made personal computing intuitive. Plus, look how it makes Bill dance.
            <br></br>
            <br></br>
            How did I build it?
            <br></br>
            Mostly React. I used styled components and built on top of the scaffolding created by the cool people behind  
              <LinkUnderlined target="_blank" href="https://github.com/React95/React95">
                {" "} React95.
              </LinkUnderlined>
            <br></br>
            <br></br>
            Who am I?
            <br></br>
            An easily exciteable software developer based in Toronto. Here are some links to my favourite 
              <LinkUnderlined target="_blank" href="https://open.spotify.com/user/sstefan33?si=9D5qZx4oThagRNpRUhesxg">
              {" "} music,
              </LinkUnderlined>
              <LinkUnderlined target="_blank" href="https://letterboxd.com/stefansokic/films/">
              {" "} movies,
              </LinkUnderlined>
              <LinkUnderlined target="_blank" href="https://www.goodreads.com/user/show/109799337-stefan-soki">
              {" "} books,
              </LinkUnderlined>
              <LinkUnderlined target="_blank" href="https://www.youtube.com/user/BonAppetitDotCom">
              {" "} youtube channel,
              </LinkUnderlined>
              <LinkUnderlined target="_blank" href="https://dieworkwear.com/">
              {" "} blog,
              </LinkUnderlined>
              {" "} and
              <LinkUnderlined target="_blank" href="https://metro.co.uk/wp-content/uploads/2016/05/ad_204471054-e1462693722164.jpg?quality=80&strip=all/">
              {" "} human.
              </LinkUnderlined>
                {" "}Feel free to say hi via 
                <LinkUnderlined target="_blank" href="https://www.linkedin.com/in/stefan-sokic-84985098/">
              {" "} LinkedIn
              </LinkUnderlined>
                 {" "}or email me at stefan.sokic33@gmail.com. I tend to respond between two and `Number.POSITIVE_INFINITY` business days.
          </div>
        </WhiteSpace>
      </Modal>
    )
  }

  renderErrorAlert(message, stateToUpdate) {
    if (!this.state[stateToUpdate]) return;
    return (
      <Alert 
        title="Error" 
        type="error" 
        message={message} 
        closeAlert={() => this.updateModal(stateToUpdate, false)}
        priority={this.getModalPriority(stateToUpdate)}
        onClickHandler={() => this.updateModal(stateToUpdate, true)}
        closeAlert={(e) => this.closeModal(e, stateToUpdate)}
        />
    )
  }

  renderMyComputer() {
    if (!this.state.isMyComputerOpen) return;
    const myComputerIconList = [
      {
        title: "Floppy (A:)",
        iconName: "reader_disket2",
        stateToUpdate: "isFloppyAlertOpen",
      },
      {
        title: "(C:)",
        iconName: "reader_closed",
        stateToUpdate: "isCDriveAlertOpen",
      },
      {
        title: "New (D:)",
        iconName: "reader_cd",
        stateToUpdate: "isDDriveAlertOpen",
      },
      {
        title: "Dial-Up",
        iconName: "folder_shared",
        stateToUpdate: "isDialUpAlertOpen",
      },
      {
        title: "Control Panel",
        iconName: "folder_settings",
        stateToUpdate: "isControlPanelOpen",
      },
      {
        title: "Printers",
        iconName: "folder_print",
        stateToUpdate: "isPrintersAlertOpen",
      },
      {
        title: "Documents",
        iconName: "folder_open",
        stateToUpdate: "isDocumentsOpen",
      },
    ]
    return (
      <Modal
        icon="computer"
        title="My Computer"
        closeModal={(e) => this.closeModal(e, "isMyComputerOpen")}
        height="400"
        width="500"
        priority={this.getModalPriority("isMyComputerOpen")}
        onClickHandler={() => this.updateModal("isMyComputerOpen", true)}
        menu={[
          {
            name: 'File',
            list: (
              <List>
                <List.Item onClick={(e) => this.closeModal(e, "isMyComputerOpen")}>Exit</List.Item>
              </List>
            ),
          },
          {
            name: 'Help',
            list: (
              <List>
                <List.Item>On this website you are helpless</List.Item>
              </List>
            ),
          },
        ]}
        >
        <WhiteSpace>
          <IconListRow>
            {
              myComputerIconList.map((item) => {
                return (
                  <IconBoxMyComputer
                    onDoubleClick={() => this.updateModal(item.stateToUpdate, true)}
                    >
                    <Icon name={item.iconName} />
                    {item.title}
                  </IconBoxMyComputer>
                )
              })
            }
          </IconListRow>
        </WhiteSpace>
      </Modal>
    )
  }

  renderControlPanel() {
    if (!this.state.isControlPanelOpen) return;
    return (
      <Modal
        icon="folder_settings"
        title="Control Panel"
        closeModal={(e) => this.closeModal(e, "isControlPanelOpen")}
        height="400"
        width="500"
        priority={this.getModalPriority("isControlPanelOpen")}
        onClickHandler={() => this.updateModal("isControlPanelOpen", true)}
        menu={[
          {
            name: 'File',
            list: (
              <List>
                <List.Item onClick={(e) => this.closeModal(e, "isControlPanelOpen")}>
                  Exit
                </List.Item>
              </List>
            ),
          },
        ]}
        >
        <WhiteSpace>
          <IconListRow>
            <IconBoxMyComputer
              onDoubleClick={() => this.updateModal("isControlPanelAlertOpen", true)}>
              <Icon name="user" />
              None
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.updateModal("isControlPanelAlertOpen", true)}>
              <Icon name="window_graph" />
              Of
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.updateModal("isControlPanelAlertOpen", true)}>
              <Icon name="tree" />
              These
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.updateModal("isControlPanelAlertOpen", true)}>
              <Icon name="signup" />
              Do
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.updateModal("isControlPanelAlertOpen", true)}>
              <Icon name="regedit" />
              Anything
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.updateModal("isControlPanelAlertOpen", true)}>
              <Icon name="ms_dos" />
              Yet
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.updateModal("isControlPanelAlertOpen", true)}>
              <Icon name="reader_cd_2" />
              But
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.updateModal("isControlPanelAlertOpen", true)}>
              <Icon name="power_off" />
              I
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.updateModal("isControlPanelAlertOpen", true)}>
              <Icon name="power_on" />
              Think
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.updateModal("isControlPanelAlertOpen", true)}>
              <Icon name="mspaint" />
              The
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.updateModal("isControlPanelAlertOpen", true)}>
              <Icon name="keys" />
              Icons
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.updateModal("isControlPanelAlertOpen", true)}>
              <Icon name="issue" />
              Still
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.updateModal("isControlPanelAlertOpen", true)}>
              <Icon name="globe" />
              Look
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.updateModal("isControlPanelAlertOpen", true)}>
              <Icon name="defrag" />
              Pretty
            </IconBoxMyComputer>
            <IconBoxMyComputer
              onDoubleClick={() => this.updateModal("isControlPanelAlertOpen", true)}>
              <Icon name="file_icons" />
              Great
            </IconBoxMyComputer>
          </IconListRow>
        </WhiteSpace>
      </Modal>
    )
    // TODO: change name of <IconBoxMyComputer> to just IconBoxHorizontal or something
  }


  renderDocuments() {
    if (!this.state.isDocumentsOpen) return;
    return (
      <Modal
        icon="folder_open"
        title="Documents" // "My Digital Brain"?
        closeModal={(e) => this.closeModal(e, "isDocumentsOpen")}
        height="400"
        width="500"
        priority={this.getModalPriority("isDocumentsOpen")}
        onClickHandler={() => this.updateModal("isDocumentsOpen", true)}
        menu={[
          {
            name: 'File',
            list: (
              <List>
                <List.Item 
                  onClick={(e) => this.closeModal(e, "isDocumentsOpen")}
                  >
                  Exit
                </List.Item>
              </List>
            ),
          },
        ]}
        >
        <WhiteSpace>
          <IconListRow>
            <IconBoxMyComputer
              onDoubleClick={() => this.updateModal("isMoviesModalOpen", true)}
              >
              <Icon name="folder" />
              Movies
            </IconBoxMyComputer>
            <IconBoxMyComputer 
              onDoubleClick={() => this.updateModal("isBooksModalOpen", true)}
              >
              <Icon name="folder" />
              Books
            </IconBoxMyComputer>
            <IconBoxMyComputer 
              onDoubleClick={() => this.updateModal("isRecipesModalOpen", true)}
              >
              <Icon name="folder" />
              Recipes
            </IconBoxMyComputer>
          </IconListRow>
        </WhiteSpace>
      </Modal>
    )
  }

  renderRecycleBin() {
    if (!this.state.isRecycleBinOpen) return;
    return (
      <Modal
        icon="recycle_full"
        title="Recycle Bin" 
        closeModal={(e) => this.closeModal(e, "isRecycleBinOpen")}
        height="400"
        width="500"
        priority={this.getModalPriority("isRecycleBinOpen")}
        onClickHandler={() => this.updateModal("isRecycleBinOpen", true)}
        menu={[
          {
            name: 'File',
            list: (
              <List>
                <List.Item 
                  onClick={(e) => this.closeModal(e, "isRecycleBinOpen")}
                  >
                  Exit
                </List.Item>
              </List>
            ),
          },
        ]}
        >
        <WhiteSpace>
          <IconListRow>
            <IconBoxMyComputer 
              onDoubleClick={() => this.updateModal("isLiarPngOpen", true)}>
              <Icon name="bat"/>
              liar.png
            </IconBoxMyComputer>
            <IconBoxMyComputer 
              onDoubleClick={() => this.updateModal("isAwfulExperienceVideoOpen", true)}>
              <Icon name="media_video" />
              bad_time.mp4
            </IconBoxMyComputer>
          </IconListRow>
        </WhiteSpace>
      </Modal>
    )
  }

  renderStartupScreen() {
    if (!this.state.startingUp) return;
    return (
      <React.Fragment>
        <CoverBackground src={clouds}/>
        <LogoSvg src={logo} />
      </React.Fragment>
    );
  }

  renderShutdownScreen() {
    if (!this.state.shuttingDown) return;
    return <CoverBackground src={shutdown}/>
  }

  renderWelcomeVideo() {
    if (!this.state.isWelcomeVideoOpen) return;
    return (
      <Modal
        icon="mute"
        title="launch_party.mp4"
        closeModal={(e) => this.closeModal(e, "isWelcomeVideoOpen")}
        height="390"
        width="555"
        priority={this.getModalPriority("isWelcomeVideoOpen")}
        onClickHandler={() => this.updateModal("isWelcomeVideoOpen", true)}
        >
          <ReactPlayer 
            url='https://www.youtube.com/watch?v=y0CRWAz09r8&t=60s' 
            playing={true}
            muted={true}
            width="540px"
            loop={true}
            youtubeConfig={{ playerVars: { controls: 0 } }}
            />
      </Modal>
    )
  }

  renderLiarPng() {
    if (!this.state.isLiarPngOpen) return;
    return (
      <Modal
        icon="window_graph"
        title="liar.png"
        closeModal={(e) => this.closeModal(e, "isLiarPngOpen")}
        height="325"
        width="400"
        priority={this.getModalPriority("isLiarPngOpen")}
        onClickHandler={() => this.updateModal("isLiarPngOpen", true)}
        >
          <img 
            src="https://i.redd.it/ti1gsbujh5n31.png"
            id="liar-png"/>
      </Modal>
    )
  }

  renderAwfulExperienceVideo() {
    if (!this.state.isAwfulExperienceVideoOpen) return;
    return (
      <Modal
        icon="window_abc"
        title="bad_time.mp4"
        closeModal={(e) => this.closeModal(e, "isAwfulExperienceVideoOpen")}
        height="390"
        width="465"
        onClickHandler={() => this.updateModal("isAwfulExperienceVideoOpen", true)}
        priority={this.getModalPriority("isAwfulExperienceVideoOpen")}
        >
          <ReactPlayer 
            url='https://www.youtube.com/watch?v=tscOUFxV3qA' 
            playing={true}
            width="450px"
            loop={true}
            youtubeConfig={{ playerVars: { controls: 0 } }}
            />
      </Modal>
    )
  }

  renderDesktopIcons() {
    const desktopIconsList = [
      {
        title: "My Computer",
        iconName: "computer",
        stateToUpdate: "isMyComputerOpen",
      },
      {
        title: "Why.txt",
        iconName: "file_text",
        stateToUpdate: "isWhyModalOpen",
      },
      // {
      //   title: "Music",
      //   iconName: "cd_music",
      //   stateToUpdate: "isMusicOpen",
      // },
      {
        title: "NotePad",
        iconName: "notepad",
        stateToUpdate: "isNotepadOpen",
      },
      {
        title: "Resume.pdf",
        iconName: "wordpad",
        stateToUpdate: "isResumePDFOpen",
      },
      {
        title: "Recycle Bin",
        iconName: "recycle_full",
        stateToUpdate: "isRecycleBinOpen",
      },
    ];
    return <IconList>
      {
        desktopIconsList.map((icon) => {
          return (
            <IconBox onDoubleClick={() => this.updateModal(icon.stateToUpdate, true)}>
              <Icon name={icon.iconName} />
              {icon.title}
            </IconBox>
          );
        })
      }
    </IconList>;
  }

  renderMoviesModal() {
    if (!this.state.isMoviesModalOpen) return;
    return (  
      <Modal
        icon="folder_open"
        title="Movies"
        height="400"
        width="500"
        closeModal={(e) => this.closeModal(e, "isMoviesModalOpen")}
        priority={this.getModalPriority("isMoviesModalOpen")}
        onClickHandler={() => this.updateModal("isMoviesModalOpen", true)}
        menu={[
          {
            name: 'File',
            list: (
              <List>
                <List.Item 
                  onClick={(e) => this.closeModal(e, "isMoviesModalOpen")}
                  >
                  Exit
                  </List.Item>
              </List>
            ),
          },
        ]}
        >
        <WhiteSpace>
          <IconListRow>
            <Link target="_blank" href="https://letterboxd.com/film/8-half/">
              <IconBoxMyComputer>
                <Icon name="media_video"/>
                8 1/2
              </IconBoxMyComputer>
            </Link>
            <Link target="_blank" href="https://letterboxd.com/film/whiplash-2014/">
              <IconBoxMyComputer>
                <Icon name="media_video"/>
                Whiplash
              </IconBoxMyComputer>
            </Link>
            <Link target="_blank" href="https://letterboxd.com/film/whos-singin-over-there/">
              <IconBoxMyComputer>
                <Icon name="media_video"/>
                Ko to Tamo...
              </IconBoxMyComputer>
            </Link>
            <Link target="_blank" href="https://letterboxd.com/film/parasite-2019/">
              <IconBoxMyComputer>
                <Icon name="media_video"/>
                Parasite
              </IconBoxMyComputer>
            </Link>
            <Link target="_blank" href="https://letterboxd.com/film/women-on-the-verge-of-a-nervous-breakdown/">
              <IconBoxMyComputer>
                <Icon name="media_video"/>
                Women on...
              </IconBoxMyComputer>
            </Link>
          </IconListRow>
        </WhiteSpace>
      </Modal>
    );
  }

  renderBooksModal() {
    if (!this.state.isBooksModalOpen) return;
    return (  
      <Modal
        icon="folder_open"
        title="Books"
        height="400"
        width="500"
        closeModal={(e) => this.closeModal(e, "isBooksModalOpen")}
        priority={this.getModalPriority("isBooksModalOpen")}
        onClickHandler={() => this.updateModal("isBooksModalOpen", true)}
        menu={[
          {
            name: 'File',
            list: (
              <List>
                <List.Item 
                  onClick={(e) => this.closeModal(e, "isBooksModalOpen")}
                  >
                  Exit
                  </List.Item>
              </List>
            ),
          },
        ]}
        >
        <WhiteSpace>
          <IconListRow>
            <Link target="_blank" href="https://www.goodreads.com/book/show/485894.The_Metamorphosis">
              <IconBoxMyComputer>
                <Icon name="bookmark"/>
                Metamorph...
              </IconBoxMyComputer>
            </Link>
            <Link target="_blank" href="https://www.goodreads.com/book/show/19380.Candide">
              <IconBoxMyComputer>
                <Icon name="bookmark"/>
                Candide
              </IconBoxMyComputer>
            </Link>
            <Link target="_blank" href="https://www.goodreads.com/book/show/91950.The_Myth_of_Sisyphus">
              <IconBoxMyComputer>
                <Icon name="bookmark"/>
                The Myth of...
              </IconBoxMyComputer>
            </Link>
            <Link target="_blank" href="https://www.goodreads.com/book/show/4981.Slaughterhouse_Five">
              <IconBoxMyComputer>
                <Icon name="bookmark"/>
                Slaughterho...
              </IconBoxMyComputer>
            </Link>
            <Link target="_blank" href="https://www.goodreads.com/book/show/97411.Letters_from_a_Stoic">
              <IconBoxMyComputer>
                <Icon name="bookmark"/>
                Letters fro...
              </IconBoxMyComputer>
            </Link>
            <Link target="_blank" href="https://www.goodreads.com/book/show/9717.The_Unbearable_Lightness_of_Being">
              <IconBoxMyComputer>
                <Icon name="bookmark"/>
                The Unbeara...
              </IconBoxMyComputer>
            </Link>
            <Link target="_blank" href="https://www.goodreads.com/book/show/7144.Crime_and_Punishment">
              <IconBoxMyComputer>
                <Icon name="bookmark"/>
                Crime and...
              </IconBoxMyComputer>
            </Link>
          </IconListRow>
        </WhiteSpace>
      </Modal>
    );
  }

  renderRecipesModal() {
    if (!this.state.isRecipesModalOpen) return;
    return (  
      <Modal
        icon="folder_open"
        title="Recipes"
        height="400"
        width="500"
        closeModal={(e) => this.closeModal(e, "isRecipesModalOpen")}
        priority={this.getModalPriority("isRecipesModalOpen")}
        onClickHandler={() => this.updateModal("isRecipesModalOpen", true)}
        menu={[
          {
            name: 'File',
            list: (
              <List>
                <List.Item 
                  onClick={(e) => this.closeModal(e, "isRecipesModalOpen")}
                  >
                  Exit
                  </List.Item>
              </List>
            ),
          },
        ]}
        >
        <WhiteSpace>
          <IconListRow>
            <Link target="_blank" href="https://www.bonappetit.com/recipe/bas-best-buttermilk-biscuits">
              <IconBoxMyComputer>
                <Icon name="microsoft_exchange"/>
                Biscuits
              </IconBoxMyComputer>
            </Link>
            <Link target="_blank" href="http://ciaosamin.com/ciao/simple-cabbage-slaw">
              <IconBoxMyComputer>
                <Icon name="microsoft_exchange"/>
                Slaw
              </IconBoxMyComputer>
            </Link>
            <Link target="_blank" href="https://www.7x7.com/samin-nosrats-buttermilk-marinated-roast-chicken-recipe-1783817149.html">
              <IconBoxMyComputer>
                <Icon name="microsoft_exchange"/>
                Roast Chi...
              </IconBoxMyComputer>
            </Link>
            <Link target="_blank" href="https://www.bonappetit.com/recipe/bas-best-quiche-lorraine">
              <IconBoxMyComputer>
                <Icon name="microsoft_exchange"/>
                Quiche
              </IconBoxMyComputer>
            </Link>
            <Link target="_blank" href="https://www.bonappetit.com/recipe/spiced-pear-upside-down-cake">
              <IconBoxMyComputer>
                <Icon name="microsoft_exchange"/>
                Pear Cake
              </IconBoxMyComputer>
            </Link>
            <Link target="_blank" href="https://www.bonappetit.com/recipe/fattoush">
              <IconBoxMyComputer>
                <Icon name="microsoft_exchange"/>
                Fattoush
              </IconBoxMyComputer>
            </Link>
          </IconListRow>
        </WhiteSpace>
      </Modal>
    );
  }

  render() {
    return (
      <div className="App">
        {/* Modals rendered on load */}
        {this.renderMobileWarning()}
        {this.renderWelcomeAlert()}
        {this.renderWelcomeVideo()}

        {/* Components rendered on load */}
        {this.renderDesktopIcons()}
        {/* TODO: put this in the footer */}
        {this.renderStartMenu()} 
        <Footer clickHandler={() => this.setState({isStartMenuOpen: !this.state.isStartMenuOpen})} />
        
        {/* Full screen images */}
        {this.renderStartupScreen()}
        {this.renderShutdownScreen()}

        {/* Modals */}
        {this.renderResumePDF()}
        {this.renderWhyModal()}
        {this.renderNotepad()}
        {this.renderMyComputer()}
        {this.renderDocuments()}
        {this.renderRecycleBin()}
        {this.renderLiarPng()}
        {this.renderAwfulExperienceVideo()}
        {this.renderControlPanel()}

        {/* Modals in Documents */}
        {this.renderMoviesModal()}
        {this.renderBooksModal()}
        {this.renderRecipesModal()}

        {/* Alerts */}
        {this.renderControlPanelAlert()}
        {this.renderErrorAlert("No floppy disk found", "isFloppyAlertOpen")}
        {this.renderErrorAlert("No C: drive found.", "isCDriveAlertOpen")}
        {this.renderErrorAlert("Does anyone know what a D: drive is?", "isDDriveAlertOpen")}
        {this.renderErrorAlert("This is a website. You already have internet.", "isDialUpAlertOpen")}
        {this.renderErrorAlert("No printers detected.", "isPrintersAlertOpen")}
        {this.renderErrorAlert("On this website you are helpless.", "isHelpAlertOpen")}
      </div>
    );
  }
}

export default App;
