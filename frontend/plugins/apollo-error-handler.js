export default (error, context) => {
  console.log(error);
  context.error({ statusCode: 400, message: 'Server error' });
}