import React from 'react';
import Navbar from '.';
import {component} from '#src/testing/snapshots';

component('Navbar').when('standard', ()=> <Navbar />);
