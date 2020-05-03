import React from 'react';
import Bounce from '.';
import {component} from '#src/testing/snapshots';

component('Bounce').when('standard', ()=> <Bounce />);
