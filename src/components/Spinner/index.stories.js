import React from 'react';
import Spinner from '.';
import {component} from '#src/testing/snapshots';

component('Spinner').when('standard', ()=> <Spinner />);
