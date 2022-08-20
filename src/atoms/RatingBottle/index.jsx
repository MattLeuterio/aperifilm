import { Container } from './style';
import { RenderBottles } from '..';

const RatingBottle = ({
  vote, size, className, personalVote
}) => {
  return (
    <Container personalVote={personalVote} size={size} className={className}>
      <RenderBottles size={size} vote={vote}/>
    </Container>
  );
};

RatingBottle.SIZE = {
	SMALL: 'small',
	MEDIUM: 'medium'
}

RatingBottle.defaultProps = {
	size: 'medium',
  vote: 0
}

export default RatingBottle;
