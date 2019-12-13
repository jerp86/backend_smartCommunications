import TotalVoice from 'totalvoice-node';
import * as Yup from 'yup';

const client = new TotalVoice(process.env.ACCESSTOKEN);

class TotalVoiceController {
  async sms(req, res) {
    /**
     * Validating input data
     */
    const schema = Yup.object().shape({
      numero_destino: Yup.string()
        .max(11)
        .required(),
      mensagem: Yup.string()
        .max(160)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { numero_destino, mensagem } = req.body;

    client.sms
      .enviar(numero_destino, mensagem)
      .then(data => {
        return res
          .status(data.status)
          .json({ id: data.dados.id, message: data.mensagem });
      })
      .catch(error => {
        return res
          .status(error.data.status)
          .json({ message: error.data.mensagem });
      });
  }

  async tts(req, res) {
    const { numero_destino, mensagem, velocidade, tipo_voz } = req.body;

    const opcoes = {
      velocidade: velocidade || 1,
      tipo_voz: tipo_voz || 'br-Vitoria',
    };

    client.tts
      .enviar(numero_destino, mensagem, opcoes)
      .then(function(data) {
        console.log(data);
        return res.status(data.status).json(data);
      })
      .catch(function(error) {
        console.log('Erro: ', error);
        return res.status(error.status).json(error);
      });
  }

  async chamada(req, res) {
    const { numero_origem, numero_destino } = req.body;

    client.chamada
      .ligar(numero_origem, numero_destino)
      .then(function(data) {
        console.log(data);
        return res.status(data.status).json(data);
      })
      .catch(function(error) {
        console.error('Erro: ', error);
        return res.status(error.status).json(error);
      });
  }
}

export default new TotalVoiceController();
