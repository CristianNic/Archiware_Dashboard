import React, { Component } from "react";
import {
  Button, Divider, Menu, Dropdown, List, Select, Segment
} from 'semantic-ui-react';
import { neighbourhoods } from '../../utils/Utils';

const countryOptions = [
  { key: 'bb', value: 'bb', text: 'Barbados' },
  { key: 'by', value: 'by', text: 'Belarus' },
  { key: 'be', value: 'be', text: 'Belgium' },
  { key: 'bz', value: 'bz', text: 'Belize' },
]
const languageOptions = [
  { key: 'Danish', text: 'Danish', value: 'Danish' },
  { key: 'Dutch', text: 'Dutch', value: 'Dutch' },
  { key: 'English', text: 'English', value: 'English' },
  { key: 'French', text: 'French', value: 'French' },
  { key: 'Lithuanian', text: 'Lithuanian', value: 'Lithuanian' },
  { key: 'Persian', text: 'Persian', value: 'Persian' },
  { key: 'Polish', text: 'Polish', value: 'Polish' },
  { key: 'Russian', text: 'Russian', value: 'Russian' },
  { key: 'Spanish', text: 'Spanish', value: 'Spanish' },
  { key: 'Swedish', text: 'Swedish', value: 'Swedish' },
  { key: 'Turkish', text: 'Turkish', value: 'Turkish' },
  { key: 'Vietnamese', text: 'Vietnamese', value: 'Vietnamese' },
]
const neighbourhoodOptions = [
  { key: 'Downtown', text: 'Downtown', value: 'Downtown' },
  { key: 'Mount Pleasant', text: 'Mount Pleasant', value: 'Mount Pleasant' },
  { key: 'West End', text: 'West End', value: 'West End' },
  { key: 'Strathcona', text: 'Strathcona', value: 'Strathcona' },
  { key: 'Lithuanian', text: 'Lithuanian', value: 'Lithuanian' },
  { key: 'Persian', text: 'Persian', value: 'Persian' },
  { key: 'Polish', text: 'Polish', value: 'Polish' },
  { key: 'Russian', text: 'Russian', value: 'Russian' },
  { key: 'Spanish', text: 'Spanish', value: 'Spanish' },
  { key: 'Swedish', text: 'Swedish', value: 'Swedish' },
  { key: 'Turkish', text: 'Turkish', value: 'Turkish' },
  { key: 'Vietnamese', text: 'Vietnamese', value: 'Vietnamese' },
]

	// "Shaughnessy",
	// "Stanley Park",
	// "Grandview-Woodland",
	// "Kensington-Cedar Cottage",
	// "Kitsilano",
	// "Fairview",
	// "Marpole",
	// "RileyPark",
	// "Oakridge",
	// "Sunset",
	// "Hastings-Sunrise",
	// "Killarney",
	// "South Cambie",
	// "Arbutus Ridge",
  //   "West Point Grey",
    


class Controls_Sandbox extends Component {

  state = {
    tree1: false,
    tree2: false,
    // colors: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99'],
    colors: ['#6a3d9a', '#1f78b4', '#b15928', '#33a02c', '#ff7f00'],
    trees: ["Kwanzan Flowering Cherry", "Red Maple", "Chanticleer Pear", "Crimean Linden", "Norway Maple"],
    apiCall: '',
    neighbourhoods: neighbourhoods
  }

  handleItemClick = (e, { name }) => (
    this.setState({
      tree1: !this.state.tree1,
    })
  )
  handleItemClick_2 = (e, { name }) => (
    this.setState({
      tree2: !this.state.tree2,
    })
  )

  handleClickToggle = () =>
    this.setState((prevState) => ({ active: !prevState.active }))

  render() {

    const { tree1, tree2, trees, colors, neighbourhoods, active } = this.state

    return (
      <section className="controls">
        <h1>Example Controls</h1>

        <div className="controls__container">

          <div className="controls__group-left">
            <button class ="ui green button" >Hello</button>
            <button class ="ui color1 button" >Hello</button>
            <button class="ui button">make "visible on hover false"</button>
            
            <div className="cool-group">
              <Button style={{backgroundColor: colors[0], color: '#FsdFFF'}}>Six</Button>
              <Button style={{backgroundColor: colors[1], color: '#000000'}}>Six</Button>
              <Button style={{backgroundColor: colors[2], color: '#FsdFFF'}}>Six</Button>
              <Button style={{backgroundColor: colors[3], color: '#FsdFFF'}}>Six</Button>
              <Button style={{backgroundColor: colors[4], color: '#000000'}}>Six</Button>
            </div>
              
            <div class ="ui divider"></div><div class ="ui divider"></div>
                
            <div class ="ui vertical basic buttons">
              <button class ="ui button" color="red">One</button>
              <button class ="ui button">Two</button>
              <button class ="ui button">Three</button>
              <button class ="ui button">Four</button>
              <button class="ui button">Five</button>
            </div>
            
          {/******** Button Group ********/}
            <Divider></Divider>
            <div class ="ui vertical basic buttons">
              <Button icon='settings'>{trees[0]}</Button>
              <Button>{trees[1]}</Button>
              <Button>{trees[2]}</Button>
              <Button>{trees[3]}</Button>
              <Button>{trees[4]}</Button>
            </div>
            <Divider></Divider>

            <Menu vertical>
              {/* <Menu.Item>
                <Input icon='search' placeholder='Search mail...' />
              </Menu.Item> */}
              <Dropdown item text='Categories'>
                <Dropdown.Menu>
                  <Dropdown.Item>{neighbourhoods[0]}</Dropdown.Item>
                  <Dropdown.Item>{neighbourhoods[1]}</Dropdown.Item>
                  <Dropdown.Item>{neighbourhoods[2]}</Dropdown.Item>
                  <Dropdown.Item>{neighbourhoods[7]}</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
              <Menu.Item
                name='Tree one'
                active={tree1 === true}
                onClick={this.handleItemClick}>
                {trees[0]}
              </Menu.Item>
              <Menu.Item
                name='Tree two'
                active={tree2 === true}
                onClick={this.handleItemClick_2}>
                {trees[1]}
              </Menu.Item>
            </Menu>
                
          </div>
            
          <div className="controls__group-left-2">
            
    <Divider></Divider>
            
            <Menu vertical>
            {/* Dropdown also has attributes  --> search and selection   */}
              <Dropdown item text='Neighbourhood <--'>
                <Dropdown.Menu>
                  <Dropdown.Item>{neighbourhoods[0]}</Dropdown.Item>
                  <Dropdown.Item description='1782 trees' text={neighbourhoods[1]} />
                  <Dropdown.Item description='1782 trees' text={neighbourhoods[2]} />
                  <Dropdown.Item description='1782 trees' text={neighbourhoods[3]}/>
                  <Dropdown.Item active='true'>{neighbourhoods[4]}</Dropdown.Item>
                  <Dropdown.Item>{neighbourhoods[5]}</Dropdown.Item>
                  <Dropdown.Item disabled='true'>{neighbourhoods[6]}</Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => alert('hello')}>{neighbourhoods[7]}</Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => this.setSate({ tree1: true })}
                  > {neighbourhoods[8]}</Dropdown.Item>
                  <Dropdown.Item description='1782 trees' text={neighbourhoods[9]} />
                  <Dropdown.Item description='1782 trees' text='Some supper long name here it is man!!!!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'/>
                  <Dropdown.Item description='1782 trees' text={neighbourhoods[7]}/>
                </Dropdown.Menu>
              </Dropdown>
              <Menu.Item
                className="tree-in-menu" name='Tree one'active={tree1 === true}
                onClick={this.handleItemClick}>{trees[0]}
              </Menu.Item>
              <Menu.Item name='Tree two' active={tree2 === true}
                onClick={this.handleItemClick_2}>{trees[1]}
              </Menu.Item>
              <Menu.Item color= "olive" name='Test'>{trees[2]}</Menu.Item>
              <Menu.Item name='Test'>{trees[3]}</Menu.Item>
              <Menu.Item name='Test'>{trees[4]}</Menu.Item>

            </Menu>

    <Divider></Divider>        
        
            <div className="mixed_bag">
              <Button compact='true' style={{backgroundColor: colors[0], color: '#FsdFFF'}}>{trees[0]}</Button>
              <Button compact='true' style={{backgroundColor: colors[1], color: '#000000'}}>{trees[1]}</Button>
              <Button compact='true' style={{backgroundColor: colors[2], color: '#FsdFFF'}}>{trees[2]}</Button>
              <Button compact='true' style={{backgroundColor: colors[3], color: '#FsdFFF'}}>{trees[3]}</Button>
              <Button compact='true' style={{ backgroundColor: colors[4], color: '#000000'}}>{trees[4]}</Button>
              {/* <Button style={{ backgroundColor: colors[4], color: '#000000' }} circular /> */}
            </div>
            
    <Divider></Divider>

            <Menu vertical className="width">
              <Menu.Item>
                <Dropdown placeholder='More' fluid selection options={neighbourhoodOptions} />
              </Menu.Item>
              {/* <Menu.Item header>Display Trees:</Menu.Item> */}
              <Menu.Item style={{color: colors[0]}} as='a'>{trees[0]}</Menu.Item>
              {/* <Menu.Item style={{backgroundColor: '#ebebeb', color: colors[0]}} as='a'>{trees[0]}</Menu.Item> */}
              <Menu.Item active style={{color: colors[1]}} as='a'>{trees[1]}</Menu.Item>
              <Menu.Item active style={{color: colors[2]}} as='a'>{trees[2]}</Menu.Item>
              <Menu.Item style={{color: colors[3]}} as='a'>{trees[3]}</Menu.Item>
              <Menu.Item style={{color: colors[4]}} as='a'>{trees[4]}</Menu.Item>
            </Menu>

    <Divider></Divider>
            {/* Set active from [list] --> https://react.semantic-ui.com/collections/menu/#variations-inverted-secondary */}
            
            <div className="mixed_bag-good-one">
              {/* <div className="dropdown-good-one"> */}
                {/* A compact dropdown has no minimum width. */}
                {/* https://codesandbox.io/s/0z7fb?module=/example.js&file=/example.js*/}
                {/* <Dropdown style={{ backgroundColor: '#FsdFFF', color: '#FsdFFF' }}
                  direction="left" basic='true' compact='true' upward placeholder='Neighbourhood' fluid options={languageOptions} />
              </div> */}
            
              <div className="space">
                {/* <Button compact='true' */}
                <Button
                  style={{ backgroundColor: colors[0], color: '#FsdFFF' }} attached='left'>&nbsp;</Button>
                <Button compact='true' toggle active={active} onClick={this.handleClickToggle}
                  // style={{ backgroundColor: '#FsdFFF', color: '#FsdFFF' }} attached='right'>{trees[0]}</Button>
                  style={{ backgroundColor: '#FFF', color: '#FsdFFF' }} attached='right'>{trees[0]}</Button>
              </div>
              <div className="space">
                {/* <Button compact='true' */}
                <Button
                  style={{ backgroundColor: colors[1], color: '#FsdFFF' }} attached='left'>&nbsp;</Button>
                <Button compact='true'
                  // style={{ backgroundColor: '#FsdFFF', color: '#FsdFFF' }} attached='right'>{trees[1]}</Button>
                  style={{ backgroundColor: '#FsdFFF', color: colors[1] }} attached='right'>{trees[1]}</Button>
              </div>
              <div className="space">
                {/* <Button compact='true' */}
                <Button
                  style={{ backgroundColor: colors[2], color: '#FsdFFF' }} attached='left'>&nbsp;</Button>
                <Button compact='true'
                  style={{ backgroundColor: '#FsdFFF', color: colors[2] }} attached='right'>{trees[2]}</Button>
              </div>
              <div className="space">
                {/* <Button compact='true' */}
                <Button
                  style={{ backgroundColor: colors[3], color: '#FsdFFF' }} attached='left'>&nbsp;</Button>
                <Button compact='true'
                  style={{ backgroundColor: '#FsdFFF', color: '#FsdFFF' }} attached='right'>{trees[3]}</Button>
              </div>
              <div className="space">
                {/* <Button compact='true' */}
                <Button
                  style={{ backgroundColor: colors[4], color: '#FsdFFF' }} attached='left'>&nbsp;</Button>
                <Button compact='true'
                  style={{ backgroundColor: '#FsdFFF', color: '#FsdFFF' }} attached='right'>{trees[4]}</Button>
              </div>
            </div>




                {/* <Menu.Item>
      <Dropdown placeholder='More' fluid selection options={languageOptions} />
            </Menu.Item> */}
            



    <Divider></Divider>
            
            <div className="mixed_bag-2">
               <List verticalAlign='middle'>
                 <List.Item verticalAlign='middle'>
                  <Button compact='true' color='orange'>{this.state.trees[0]}</Button>
                </List.Item >
                <List.Item verticalAlign='middle'>
                  <Button compact='true' color='olive'>{this.state.trees[1]}</Button>
                </List.Item>
                <List.Item>
                  <Button compact='true' color='violet'>{this.state.trees[2]}</Button>
                </List.Item>
                <List.Item>
                  <Button compact='true' color='brown'>{this.state.trees[3]}</Button>
                </List.Item>
                <List.Item>
                  <Button compact='true' color='teal'>{this.state.trees[4]}</Button>
                </List.Item>
              </List>
            </div>
        </div>

          <div className="container__group-left-3">

            <div class="ui pointing vertical menu">
              <a class="item">
                Site Title
              </a>
              <div class="item">
                <b>Grouped Section</b>
                <div class="menu">
                  <a class="item">{trees[0]}</a>
                  <a class="active item">{trees[1]}</a>
                  <a class="item">{trees[2]}</a>
                </div>
              </div>
              <div class="ui dropdown item">
                Neighbourhoods <i class="dropdown icon"></i>
                <div class="menu">
                  <div class="item">{neighbourhoods[0]}</div>
                  <div class="item">{neighbourhoods[1]}</div>
                  <div class="item">{neighbourhoods[2]}</div>
                </div>
              </div>
            </div>
            
    <Divider></Divider>
        
            <Select placeholder='Select your country' options={countryOptions} />
            
        <Divider></Divider>
            

              <Dropdown
    button
    className='icon'
    floating
    labeled
    options={languageOptions}
    search
    text='Neighbourhood'
            />
            
            <Dropdown placeholder='State' search selection options={languageOptions} />

            <Divider></Divider>
            
            {/* <Segment.Group> */}
              <Menu vertical className="width">
    <Menu.Item as='a'>Link 1</Menu.Item>
    <Menu.Item as='a'>Link 2</Menu.Item>
    <Menu.Item header>All Sections</Menu.Item>
    <Menu.Item>
      <Dropdown placeholder='More' fluid selection options={languageOptions} />
    </Menu.Item>
  </Menu>

            {/* </Segment.Group> */}
            
            <Divider></Divider>
            


        {/* <Grid.Column> */}
          {/* <Segment attached='top'>Segment 1</Segment> */}
          {/* <Segment attached>Segment 2</Segment>
          <Segment attached>Segment 3</Segment> */}
          {/* <Segment attached='bottom'>Segment 4</Segment> */}

          <Segment.Group>
            {/* <Segment>
              <p>Top</p>
            </Segment> */}
            <Segment.Group>
              <Segment>
                <p>Nested Top</p>
              </Segment>
              <Segment>
                <p>Nested Middle</p>
              </Segment>
              <Segment>
                <p>Nested Bottom</p>
              </Segment>
            </Segment.Group>
                
            {/* <Segment>
              <p>Middle</p>
            </Segment> */}
            {/* <Segment.Group horizontal>
              <Segment>
                <p>Top</p>
              </Segment>
              <Segment>
                <p>Middle</p>
              </Segment>
              <Segment>
                <p>Bottom</p>
              </Segment>
            </Segment.Group> */}
            {/* <Segment>
              <p>Bottom</p>
            </Segment> */}
          </Segment.Group>
          {/* </Grid.Column> */}
            



</div>


        

          
        </div>
      </section>
    );
  }
}

export default Controls_Sandbox;


// Changing Colours 
// -> ideal one file under utils/colours - this file is cited everywhere,
// like in site.variables 
// /*---  Colors  ---*/
// @peach       : myColour;
// https://stackoverflow.com/questions/48653059/cannot-apply-custom-color-to-menu-in-semantic-ui
