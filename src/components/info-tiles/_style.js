export const getListStyle = () => ({
    display: 'block',
    width: '400px',
    boxShadow: 'none'
});

export const getTitleStyle = () => ({
    ...getItemStyle(),
    fontSize: 18,
    backgroundColor: '#00aeae'
})

export const getItemStyle = () => ({
    backgroundColor: '#1b292c',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: '48px',
    color: '#fff',
    margin_Left: 0,
    padding: '0px 16px 0px 16px',
    Height: 48,
    position: 'relative',
    textAlign: 'center',
});