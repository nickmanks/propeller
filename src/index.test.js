import ReactDOM from 'react-dom';

jest.mock('react-dom', ()=> ({
  render: jest.fn()
}));

describe('Mounting application', ()=> {
  it('calls react dom render', ()=> {
    require('.');

    expect(ReactDOM.render).toHaveBeenCalled();
  });
});
