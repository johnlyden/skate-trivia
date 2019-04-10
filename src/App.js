import React, { Component } from 'react';
import { Box, Button, Calendar, Collapsible, Diagram, Heading, Grommet, Layer, ResponsiveContext, Stack } from 'grommet';
import { FormClose, Menu } from 'grommet-icons';
import { grommet, dark } from 'grommet/themes';


const theme = {
  global: {
    colors: {
      brand: '#228BE6',
    },
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
  },
};

const AppBar = (props) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='brand'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation= 'medium'
    style={{ zIndex: '1' }}
    {...props}
  />
);

class App extends Component {
  state = {
    showSidebar: false,
  }
  render() {
    const { showSidebar } = this.state;
    return (
      <Grommet theme={theme} full>
        <ResponsiveContext.Consumer>
        {size => (
          <Box fill>
            <AppBar>
              <Button 
                icon={<Menu />} 
                onClick={() => this.setState(prevState => ({
                  showSidebar: !prevState.showSidebar
              }))} />
              <Box flex direction="row">
                <Button label="Login"/>
                <Button label="Signup"/>
              </Box>
              <Heading level='3' margin='small' >Clean My Loo</Heading>
            </AppBar>
            <Box direction='row' flex overflow={{ horizontal: 'hidden'}}>

              {(!showSidebar || size !== 'small') ? (
                <Collapsible direction="horizontal" open={showSidebar}>
                  <Box
                    flex
                    width='medium'
                    background='light-2'
                    elevation='small'
                    align='center'
                    justify='center'
                  >
                  sidebar
                  </Box>
                </Collapsible>
              ) : (
                <Layer>
                  <Box
                    background='light-2'
                    tag='header'
                    align='center'
                    justify='end'
                    direction='row'
                  >
                    <Button 
                      icon={<FormClose />} 
                      onClick={() => this.setState({ showSidebar: false })}
                    />
                  </Box>
                </Layer>
              )}
              <Box flex align='center' justify='center' style={{height: '900px'}}>
                <h2>welcome</h2>
              </Box>
            </Box>
          </Box>
        )}
        </ResponsiveContext.Consumer>
      </Grommet>
    );
  }
}

export default App;
