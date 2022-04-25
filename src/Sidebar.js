import { useState } from 'react';
import { ListGroup } from 'react-bootstrap';

function ListItem(props) {
    const classes = "p-3 list-group-item list-group-item-action " + (props.active ? "active" : "bg-transparent");
    return <ListGroup.Item active={props.active} action onClick={() => props.select(props.index)} className="p-3">{props.children}</ListGroup.Item>;
    //return <li onClick={() => props.select(props.index)} className={classes} aria-current={props.active}>{props.children}</li>
}

function FilterList(props) {
    return (
        <ListGroup className="mt-3">
            {
                props.filters.map((f,index) => {
                    return <ListItem key={index} index={index} select={props.select} active={index === props.selectedIndex}>{f}</ListItem>;
                })
            }
        </ListGroup>
    );
}

function SideNav(props) {
    return <FilterList filters={props.filters} select={props.select} selectedIndex={props.selectedIndex}></FilterList>;
};

export default SideNav;