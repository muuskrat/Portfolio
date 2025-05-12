import { useState } from 'react'
import { DndContext } from '@dnd-kit/core'


import { MainPage } from './windows/MainPage'
import { Music } from './windows/Music'
import { About } from './windows/AboutWindow'
import { Links } from './windows/LinksWindow'
import { Work } from './windows/WorkWindow'
import { Contact } from './windows/ContactWindow'
import { Success } from './windows/SentSuccessWindow'
import { Failed } from './windows/SentFailedWindow'

import { AnimatePresence, motion } from "framer-motion";


function App() {
const [openWindows, setOpenWindows] = useState([]);

const openWindow = (id) => {
  setOpenWindows((prev) => {
    // If it's already open, bring to front
    if(prev.includes(id))
      return [...prev.filter(w => w !== id), id];
    else
    // Otherwise, add to stack
      return [...prev, id];
  });
};

const closeWindow = (id) => {
  setOpenWindows((prev) =>prev.filter((w) => w !== id));
};

const bringToFront = (id) => {
  setOpenWindows((prev) => [...prev.filter(w => w !== id), id]);
};

  return (
    
      <div className="App">
        <div className="content">
          <div className="button-pannel">
            <button onClick={() => openWindow("Music")}>Open Music</button>
            <button onClick={() => openWindow("MainPage")}>Open MainPage</button>
          </div>

          <DndContext>
            <AnimatePresence>
              {openWindows.includes("MainPage") && (
                <MainPage id="MainPage"
                          zIndex={openWindows.indexOf("MainPage") + 1} 
                          onBringToFront={() => bringToFront("MainPage")}
                          onClose={() => closeWindow("MainPage")}
                          openWindow={openWindow}
                          openWindows={openWindows}
                />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {openWindows.includes("Music") && (
                <Music id="Music"
                          zIndex={openWindows.indexOf("Music") + 1} 
                          onBringToFront={() => bringToFront("Music")}
                          onClose={() => closeWindow("Music")}
                />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {openWindows.includes("About") && (
                <About id="About"
                          zIndex={openWindows.indexOf("About") + 1} 
                          onBringToFront={() => bringToFront("About")}
                          onClose={() => closeWindow("About")}
                />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {openWindows.includes("Links") && (
                <Links id="Links"
                          zIndex={openWindows.indexOf("Links") + 1} 
                          onBringToFront={() => bringToFront("Links")}
                          onClose={() => closeWindow("Links")}
                          openWindow={openWindow}
                />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {openWindows.includes("Work") && (
                <Work id="Work"
                          zIndex={openWindows.indexOf("Work") + 1} 
                          onBringToFront={() => bringToFront("Work")}
                          onClose={() => closeWindow("Work")}
                          
                />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {openWindows.includes("Contact") && (
                <Contact id="Contact"
                          zIndex={openWindows.indexOf("Contact") + 1} 
                          onBringToFront={() => bringToFront("Contact")}
                          onClose={() => closeWindow("Contact")}
                          openWindow={openWindow}
                          openWindows={openWindows}
                />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {openWindows.includes("Success") && (
                <Success id="Success"
                          zIndex={openWindows.indexOf("Success") + 1} 
                          onBringToFront={() => bringToFront("Success")}
                          onClose={() => closeWindow("Success")}
                />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {openWindows.includes("Failed") && (
                <Failed id="Failed"
                          zIndex={openWindows.indexOf("Failed") + 1} 
                          onBringToFront={() => bringToFront("Failed")}
                          onClose={() => closeWindow("Failed")}
                />
              )}
            </AnimatePresence>

          </DndContext>

          
          
        </div>
      </div>
  )
}

export default App
