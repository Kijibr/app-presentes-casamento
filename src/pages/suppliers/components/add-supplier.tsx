import React, { FC, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Content } from "src/styles/style";
import { ButtonComponent as Button } from 'src/components/BaseKit/Button';
import { Input } from 'src/components/BaseKit/Input';
import MapView from 'src/components/Maps';
import styled from 'styled-components';
import { MapContainer } from '../styles';
import { ISupplierType } from '../types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  
  overflow-y: scroll;
  align-items: center; 
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 0;
  padding: 24px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  max-height: 90svh;
  overflow-x: auto;
  position: relative;
  
  max-width: 100%;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-wrap: wrap;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 8px;
`;

interface InputGroupProps {
  direction: "row" | "column";
}

const InputGroup = styled.div<InputGroupProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  width: 100%;
  gap: 8px;
  /* flex-wrap: wrap; */
  /* @media (max-width: 768px) {
    grid-template-columns: 1fr;
  } */
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 24px;
`;

const StyledMainRow = styled.div`
  display: flex;
  gap: 32px;
  flex-direction: row;
  flex: 1;
  
  justify-content: center;
  width:  80%;
`;

const StyledFormColumn = styled.div`
  flex: 1;
  height: fit-content;
  
  min-width: 350px;
  max-width: 620px;
  
`;

const StyledPreviewColumn = styled.div`
  flex: 1.2;
  min-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px #0001;
  padding: 24px;
  margin-bottom: 0;
`;

const StyledCardTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 12px 0;
`;

const StyledMapRow = styled.div`
  display: flex;
  gap: 16px;
`;

const StyledInfoRow = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;
`;

const StyledInfoCol = styled.div`
  flex: 1;
`;

const StyledInfoText = styled.div`
  font-size: 13px;
  color: #666;
`;

const StyledRatingCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledRatingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ImageCover = styled.img`
  border-radius: 24px;
  width: 64%;
  align-self: center;

  padding-bottom: 12px;
`;

interface ContactType {
  email: string;
  phone: string;
  cellphone: string;
}

interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

interface ServiceType {
  name: string;
  description: string;
  rate: number;
}

interface ICreateSupplierDto {
  name: string;
  contact: ContactType;
  documentNumber: string;
  address: Address;
  services?: ServiceType[];
  serviceType?: string;
  description?: string;
  rate?: number;
}

interface DetailsProps {
  supplier?: ISupplierType;
  addItem: (item: ISupplierType) => void;
}

export const SupplierDetailsComponent: FC<DetailsProps> = ({ supplier, addItem }) => {
  const { control, handleSubmit, setValue, getValues, watch } = useForm<ICreateSupplierDto>({
    defaultValues: {
      name: supplier?.name || '',
      contact: {
        email: supplier?.contact?.email || '',
        phone: supplier?.contact?.phone || '',
        cellphone: supplier?.contact?.cellphone || ''
      },
      documentNumber: supplier?.documentNumber || '',
      address: {
        street: supplier?.address?.street || '',
        number: supplier?.address?.number.toString(),
        complement: supplier?.address?.complement || '',
        neighborhood: supplier?.address?.neighborhood || '',
        city: supplier?.address?.city || '',
        state: supplier?.address?.state || '',
        zipCode: supplier?.address?.zipCode.toString()
      },
      services: supplier?.services || [],
      serviceType: supplier?.serviceType || '',
      description: supplier?.description || '',
      rate: supplier?.rate ?? 0
    }
  });

  const [mapCoords, setMapCoords] = useState({ lat: -22.6866679, lng: -43.4497615 });

  const fetchViaCepCoords = async () => {
    const { zipCode, number } = getValues().address;
    if (!zipCode || zipCode.length < 8) return;
    try {
      const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);
      const data = await response.json();

      if (data && !data.erro) {
        const addressString = `${data.logradouro || ''}, ${number || ''}, ${data.bairro || ''}, ${data.localidade || ''}, ${data.uf || ''}`;
        const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addressString)}`;
        const geoRes = await fetch(nominatimUrl);
        const geoData = await geoRes.json();
        if (geoData && geoData.length > 0) {
          const { lat, lon } = geoData[0];
          setMapCoords({ lat: parseFloat(lat), lng: parseFloat(lon) });
          console.log('Coordenadas encontradas:', { lat, lon });
        } else {
          console.log('Endereço encontrado, mas sem coordenadas.');
        }
      } else {
        console.log('CEP não encontrado no ViaCEP.');
      }
    } catch (err) {
      console.error('Erro ao buscar coordenadas:', err);
    }
  };

  const onSubmit = (data: ICreateSupplierDto) => {
    console.log('Dados do formulário:', data);
  };

  return (
    <Content>
      <Container>
        <StyledMainRow>
          <StyledFormColumn>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormSection>
                <SectionTitle>Identificação</SectionTitle>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      label="Razão Social"
                      {...field}
                      required
                      style={{ height: 36, fontSize: 15, maxWidth: '100%' }}
                    />
                  )}
                />
                <InputGroup direction='row'>
                  <Controller
                    name="documentNumber"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        label="Documento (CPF/CNPJ)"
                        {...field}
                        required
                        style={{ height: 36, fontSize: 15, width: '100%' }}
                      />
                    )}
                  />
                  <Input
                    label="Inscrição Municipal"
                    value={''}
                    onChange={() => { }}
                    style={{ height: 36, fontSize: 15, width: '100%' }}
                    disabled
                  />
                </InputGroup>
              </FormSection>
              <FormSection>
                <SectionTitle>Contato</SectionTitle>
                <Controller
                  name="contact.email"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      label="E-mail"
                      type="email"
                      {...field}
                      required
                      style={{ height: 36, fontSize: 15, width: '100%' }}
                    />
                  )}
                />
                <InputGroup direction='row'>
                  <Controller
                    name="contact.phone"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        label="Telefone"
                        {...field}
                        required
                        style={{ height: 36, fontSize: 15, width: '100%' }}
                      />
                    )}
                  />
                  <Controller
                    name="contact.cellphone"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        label="Celular"
                        {...field}
                        required
                        style={{ height: 36, fontSize: 15, width: '100%' }}
                      />
                    )}
                  />
                </InputGroup>
              </FormSection>
              <FormSection>
                <SectionTitle>Endereço</SectionTitle>
                <Controller
                  name="address.street"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      label="Rua"
                      {...field}
                      required
                      style={{ height: 36, fontSize: 15, width: '100%' }}
                    />
                  )}
                />
                <InputGroup direction='row'>
                  <Controller
                    name="address.number"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        label="Número"
                        {...field}
                        required
                        style={{ height: 36, fontSize: 15, width: '100%' }}
                        onBlur={async (e) => {
                          field.onBlur();
                          await fetchViaCepCoords();
                        }}
                      />
                    )}
                  />
                  <Controller
                    name="address.complement"
                    control={control}
                    render={({ field }) => (
                      <Input
                        label="Complemento"
                        {...field}
                        style={{ height: 36, fontSize: 15, width: '100%' }}
                      />
                    )}
                  />
                  <Controller
                    name="address.neighborhood"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        label="Bairro"
                        {...field}
                        required
                        style={{ height: 36, fontSize: 15, width: '100%' }}
                      />
                    )}
                  />
                </InputGroup>

                <InputGroup direction='row'>
                  <Controller
                    name="address.city"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        label="Cidade"
                        {...field}
                        required
                        style={{ height: 36, fontSize: 15, width: '100%' }}
                      />
                    )}
                  />
                  <Controller
                    name="address.state"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        label="Estado"
                        {...field}
                        required
                        style={{ height: 36, fontSize: 15, width: '100%' }}
                      />
                    )}
                  />
                  <Controller
                    name="address.zipCode"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        label="CEP"
                        {...field}
                        required
                        style={{ height: 36, fontSize: 15, width: '100%' }}
                        onBlur={async (e) => {
                          field.onBlur();
                          await fetchViaCepCoords();
                        }}
                      />
                    )}
                  />
                </InputGroup>
              </FormSection>
              <FormSection>
                <SectionTitle>Serviços</SectionTitle>
                <InputGroup direction='column'>
                  <Controller
                    name="serviceType"
                    control={control}
                    render={({ field }) => (
                      <Input
                        label="Tipo de Serviço"
                        {...field}
                        style={{ height: 36, fontSize: 15, maxWidth: '100%' }}
                      />
                    )}
                  />
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <Input
                        label="Descrição"
                        as="textarea"
                        {...field}
                        style={{ fontSize: 15, maxWidth: '100%', minHeight: 60 }}
                      />
                    )}
                  />
                </InputGroup>
              </FormSection>
            </Form>
            <ButtonContainer>
              <Button variant="secondary" type="button">
                Cancelar
              </Button>
              <Button variant="primary" type="submit" onClick={((conteudo) => {
                console.log("conteuod: ", getValues());
                addItem(getValues()  as unknown as ISupplierType)
              })} >
                Salvar
              </Button>
            </ButtonContainer>
          </StyledFormColumn>

          <StyledPreviewColumn>
            <ImageCover
              src='https://lncimg.lance.com.br/cdn-cgi/image/width=950,quality=75,fit=pad,format=webp/uploads/2025/06/54602719764_7225ffbb05_k-aspect-ratio-512-320-5.jpg'
            />
            <StyledCard>
              <StyledCardTitle>Endereço</StyledCardTitle>
              <StyledMapRow>
                <MapContainer>
                  <MapView
                    description={getValues().address.street}
                    id={1}
                    position={[mapCoords.lat, mapCoords.lng]}
                    title={getValues().address.street}
                  />
                </MapContainer>
              </StyledMapRow>
              {/* <StyledInfoRow>
                <StyledInfoCol>
                  <strong>ServiceType</strong>
                  <StyledInfoText>{formData.serviceType || '-'}</StyledInfoText>
                </StyledInfoCol>
                <StyledInfoCol>
                  <strong>Descrição</strong>
                  <StyledInfoText>{formData.description || '-'}</StyledInfoText>
                </StyledInfoCol>
              </StyledInfoRow> */}
            </StyledCard>
            <StyledCard>
              <StyledCardTitle>Avaliação</StyledCardTitle>
              <StyledRatingCol>
                <StyledRatingRow>
                  <span>Atendimento</span>
                  <span>✔️</span>
                </StyledRatingRow>
                <StyledRatingRow>
                  <span>Preço</span>
                  <span>✔️</span>
                </StyledRatingRow>
                <StyledRatingRow>
                  <span>Nota</span>
                  <span>{getValues().rate! || '-'}</span>
                </StyledRatingRow>
              </StyledRatingCol>
            </StyledCard>
          </StyledPreviewColumn>
        </StyledMainRow>
      </Container>
    </Content>
  );
};