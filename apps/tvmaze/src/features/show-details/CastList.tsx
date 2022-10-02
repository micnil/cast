import { FC } from "react";
import noImagePerson from "../../assets/images/no-image-person.png";
import { CastMember } from "../../core/api-tvmaze/model/CastMember";
import {
  CastImage,
  CastInfo,
  CastInfoText,
  CastListContainer,
  CastListItem
} from "./styles";

interface Props {
  cast: CastMember[];
}
const CastList: FC<Props> = ({ cast }) => {
  return (
    <CastListContainer>
      <h2>Cast</h2>
      {cast.length === 0 && (
        <p>We do not have any information about cast members at this time.</p>
      )}
      {cast.map((member) => (
        <CastListItem key={member.character.id}>
          <CastImage src={member.person.image?.medium ?? noImagePerson} />
          <CastInfo>
            <CastInfoText weight={600}>{member.person.name}</CastInfoText>
            <CastInfoText>{"as: " + member.character.name}</CastInfoText>
          </CastInfo>
        </CastListItem>
      ))}
    </CastListContainer>
  );
};

export default CastList;
