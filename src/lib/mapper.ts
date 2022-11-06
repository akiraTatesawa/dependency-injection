export abstract class Mapper<I, DTO> {
  abstract toDTO(input: I): DTO;
}
