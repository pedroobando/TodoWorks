/* eslint-disable import/no-anonymous-default-export */
import cookie from 'cookie';
const seconds = 60;
const minutes = 60;
const hours = 1;

export default (req, res) => {
  const { token } = req.body;
  console.log(token);
  console.log(process.env.NODE_ENV);
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('_todoworks', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: minutes * seconds,
      sameSite: 'strict',
      path: '/',
    })
  );
  res.statusCode = 200;
  res.json({ success: true });
};
