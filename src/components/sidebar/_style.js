export const getMenuStyle = () => ({
    display: 'block',
    marginLeft: 'calc(15% - 100px)',
    marginTop: '-95px ',
    width: '200px',
    boxShadow: 'none',
    position: 'fixed'
});
  
export const getMenuItemStyle = () => ({
    position: 'relative',
    borderRadius: 0,
    Opacity: 0.7,
    fontSize: 13
});

export const getHeaderMenuItem = () => ({
    ...getMenuItemStyle(),
    backgroundColor: '#00aeae',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: '48px',
    color: '#fff',
    marginLeft: 0,
    padding: '0px 16px 0px 16px',
    minHeight: 48,
    position: 'relative',
    textAlign: 'center'
});

export const getActiveMenuItem = () => ({
    color: '#00aeae'
});